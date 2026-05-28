import imaplib
import email
from email.header import decode_header
import datetime
import argparse
import os
from dotenv import load_dotenv # <-- Nouvel import

# --- CONFIGURATION ---
load_dotenv(".env.local") 

# Récupération sécurisée depuis les variables d'environnement
EMAIL_ACCOUNT = os.environ.get("TLDR_EMAIL_ACCOUNT")
APP_PASSWORD = os.environ.get("TLDR_GMAIL_APP_PASSWORD")
SENDER = "dan@tldrnewsletter.com"
# ---------------------

def clean_subject(subject_header):
    """Décode le sujet de l'email proprement."""
    decoded_list = decode_header(subject_header)
    subject = ""
    for text, encoding in decoded_list:
        if isinstance(text, bytes):
            subject += text.decode(encoding if encoding else "utf-8", errors="ignore")
        else:
            subject += text
    return subject

def aggregate_tldr(days):
    print(f"Connexion à Gmail en cours...")
    try:
        # 1. Connexion au serveur IMAP de Gmail
        mail = imaplib.IMAP4_SSL("imap.gmail.com")
        mail.login(EMAIL_ACCOUNT, APP_PASSWORD)
        mail.select("inbox")
    except Exception as e:
        print(f"Erreur de connexion: {e}")
        return

    # 2. Calcul de la date pour le filtre IMAP
    date_since = (datetime.date.today() - datetime.timedelta(days=days)).strftime("%d-%b-%Y")

    # 3. Recherche des emails
    print(f"Recherche des newsletters TLDR depuis le {date_since}...")
    search_query = f'(FROM "{SENDER}" SENTSINCE {date_since})'
    status, messages = mail.search(None, search_query)

    if status != "OK":
        print("Erreur lors de la recherche des emails.")
        return

    email_ids = messages[0].split()
    print(f"{len(email_ids)} newsletters TLDR trouvées.")

    if not email_ids:
        print("Aucune newsletter à aggréger pour cette période.")
        return

    # Préparation du fichier HTML global
    aggregated_html = "<html><head><meta charset='utf-8'><title>TLDR Aggregated</title>"
    aggregated_html += "<style>body{font-family: sans-serif; max-width: 800px; margin: auto; padding: 20px;}</style></head><body>"
    aggregated_html += f"<h1>Vos Newsletters TLDR (sur {days} jours)</h1>"

    # Parcours des emails du plus récent au plus ancien
    for e_id in reversed(email_ids):
        res, msg_data = mail.fetch(e_id, "(RFC822)")
        for response_part in msg_data:
            if isinstance(response_part, tuple):
                msg = email.message_from_bytes(response_part[1])
                
                # Récupération du sujet
                subject = clean_subject(msg.get("Subject", "Sans Sujet"))
                aggregated_html += f"<hr><h2 style='color: #2c3e50; margin-top: 40px;'>{subject}</h2>"

                # Extraction du contenu HTML (TLDR est un email multipart avec une version texte et une version HTML)
                if msg.is_multipart():
                    for part in msg.walk():
                        content_type = part.get_content_type()
                        content_disposition = str(part.get("Content-Disposition"))

                        if content_type == "text/html" and "attachment" not in content_disposition:
                            body = part.get_payload(decode=True).decode("utf-8", errors="ignore")
                            aggregated_html += body
                            break # On arrête de chercher une fois le HTML trouvé
                else:
                    if msg.get_content_type() == "text/html":
                        body = msg.get_payload(decode=True).decode("utf-8", errors="ignore")
                        aggregated_html += body

    aggregated_html += "</body></html>"

    # 4. Sauvegarde dans un fichier
    output_file = f"tldr_aggregated_{days}_days.html"
    with open(output_file, "w", encoding="utf-8") as f:
        f.write(aggregated_html)

    print(f"✅ Agrégation terminée avec succès !")
    print(f"👉 Ouvre le fichier '{output_file}' dans ton navigateur web.")
    mail.logout()

if __name__ == "__main__":
    # Configuration du paramètre optionnel
    parser = argparse.ArgumentParser(description="Agrège les newsletters TLDR de Gmail en conservant les liens.")
    parser.add_argument("-d", "--days", type=int, default=7, help="Nombre de jours à aggréger (défaut: 7)")
    args = parser.parse_args()

    if EMAIL_ACCOUNT == "ton_adresse@gmail.com":
        print("⚠️ Attention : Pense à modifier EMAIL_ACCOUNT et APP_PASSWORD dans le script.")
    else:
        aggregate_tldr(args.days)