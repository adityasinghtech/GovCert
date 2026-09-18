import subprocess
import sys

def install(package):
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])

try:
    import qrcode
except ImportError:
    install('qrcode[pil]')
    import qrcode

data = """NAME / नाम : VEDANT SINGH
SEX / लिंग : MALE
DATE OF BIRTH / जन्म तिथि : 05-11-2022
PLACE OF BIRTH / जन्म स्थान : PRIMARY HEALTH CENTRES TEEN PAHAR
NAME OF MOTHER / माता का नाम : PRIYANKA SINGH
NAME OF FATHER / पिता का नाम : MITHILESH KUMAR
AADHAAR NUMBER OF MOTHER: XXXX-XXXX-0635
AADHAAR NUMBER OF FATHER: XXXX-XXXX-1367"""

qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_L,
    box_size=10,
    border=4,
)
qr.add_data(data)
qr.make(fit=True)

img = qr.make_image(fill_color="black", back_color="white")
img.save("C:\\Project 2\\BIRTH\\qr_code.png")
print("QR Code generated successfully at C:\\Project 2\\BIRTH\\qr_code.png")
