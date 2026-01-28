
import os
import struct

def get_image_info(file_path):
    with open(file_path, 'rb') as f:
        data = f.read(25)
        if data[:2] != b'\xff\xd8':
            return None # Not JPEG
        
        f.seek(0)
        size = 2
        ftype = 0
        while not 0xc0 <= ftype <= 0xcf or ftype in [0xc4, 0xc8, 0xcc]:
            f.seek(size, 1)
            byte = f.read(1)
            while ord(byte) == 0xff:
                byte = f.read(1)
            ftype = ord(byte)
            size = struct.unpack('>H', f.read(2))[0] - 2
        
        # We are at a SOFn block
        f.read(1)  # precision
        h, w = struct.unpack('>HH', f.read(4))
        return w, h

img_path = "public/images/frame_000.jpg"
if os.path.exists(img_path):
    dims = get_image_info(img_path)
    print(f"Image dimensions: {dims}")
else:
    print("Image not found")
