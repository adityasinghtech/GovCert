import qrcode

def generate(url, filename):
    qr = qrcode.QRCode(version=1, error_correction=qrcode.constants.ERROR_CORRECT_L, box_size=10, border=4)
    qr.add_data(url)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="transparent")
    img.save(filename)
    print(f"Generated {filename} for {url}")

generate('https://gov-cert.vercel.app/vedant.html', 'C:\\Project 2\\BIRTH\\qr_vedant.png')
generate('https://gov-cert.vercel.app/viransh.html', 'C:\\Project 2\\BIRTH\\qr_viransh.png')
