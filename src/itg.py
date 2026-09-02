import turtle
from PIL import Image, ImageOps

# ==============================
# SETTINGS
# ==============================

IMAGE = "reference.jpg"

# Original image size
WIDTH = 510
HEIGHT = 680

# Pixel block size
# 1 = maximum accuracy
# 2 = faster
PIXEL = 2

# ==============================
# LOAD IMAGE
# ==============================

img = Image.open(IMAGE)

# Fix camera/image orientation
img = ImageOps.exif_transpose(img)

# Resize while keeping correct orientation
img = img.resize((WIDTH, HEIGHT))

# Convert to RGB
img = img.convert("RGB")

# ==============================
# TURTLE SCREEN
# ==============================

screen = turtle.Screen()
screen.setup(WIDTH + 20, HEIGHT + 20)
screen.title("Accurate Turtle Image")

screen.colormode(255)
screen.tracer(0, 0)

t = turtle.Turtle()
t.hideturtle()
t.penup()
t.speed(0)

# ==============================
# DRAW IMAGE
# ==============================

for y in range(0, HEIGHT, PIXEL):

    for x in range(0, WIDTH, PIXEL):

        r, g, b = img.getpixel((x, y))

        # Convert image coordinates
        # to Turtle coordinates.
        #
        # IMPORTANT:
        # Image starts at TOP.
        # Turtle starts at CENTER.
        # Therefore Y is inverted here.

        tx = x - WIDTH / 2
        ty = HEIGHT / 2 - y

        t.goto(tx, ty)

        t.dot(
            PIXEL + 1,
            (r, g, b)
        )

# ==============================
# SHOW RESULT
# ==============================

screen.update()
turtle.done()