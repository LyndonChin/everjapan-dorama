import os
import shutil

for root, dirs, files in os.walk('.'):
    map(lambda f: shutil.move(f, '../'),
        map(lambda f: os.path.join(root, f),
            filter(lambda f: f != 'mover.py', files)))
