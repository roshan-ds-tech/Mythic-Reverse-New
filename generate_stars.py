import random

def generate_shadows(num_stars, width_vw, height_vh, min_dist=6):
    stars = []
    
    # We'll use a virtual canvas of 100x100 for simplicity, but map to vw/vh
    # To enforce min_dist roughly, we can try to generate and discard if too close.
    # Since we use vw/vh, let's assume standard 1920x1080 to estimate px distance for the check,
    # or just use a simple grid check.
    # Let's use a simpler retry approach with "units" as pseudo-pixels.
    # We will generate values in 'vw' and 'vh' strings directly.
    # To check distance, we need numerical estimates.
    # Let's assume 1vw = 19px, 1vh = 10px (approx 1920x1080).
    
    generated = []
    
    attempts = 0
    while len(generated) < num_stars and attempts < num_stars * 50:
        attempts += 1
        x = random.uniform(0, 100)
        y = random.uniform(0, 100) # Only up to 100vh? User said "at least 200vh" coverage?
        # User said "Full scroll height coverage (at least 200vh)" but seamless loop usually implies
        # the pattern itself is 100% height and repeats.
        # "Seamless looping via ::after duplication... Position ::after at top: 100%".
        # If the container is fixed 100vh, the pattern should be defined within 100vh (0-100vh).
        # And the animation moves it up 100%.
        # The ::after fills the space behind it.
        # So we should generate stars within 0-100vh.
        
        # Check distance
        too_close = False
        for gx, gy in generated:
            # Approx distance in effective "units" relative to viewport
            dx = (x - gx) * 19.0 # Roughly convert vw to pixels
            dy = (y - gy) * 10.0 # Roughly convert vh to pixels
            dist = (dx*dx + dy*dy)**0.5
            if dist < min_dist:
                too_close = True
                break
        
        if not too_close:
            generated.append((x, y))
            
    # Format
    shadows = []
    for x, y in generated:
        shadows.append(f"{x:.1f}vw {y:.1f}vh #fff")
    return ", ".join(shadows)

with open("stars.css", "w") as f:
    f.write("/* Layer 1 */\n")
    f.write(generate_shadows(200, 100, 200))
    f.write("\n\n/* Layer 2 */\n")
    f.write(generate_shadows(120, 100, 200))
    f.write("\n\n/* Layer 3 */\n")
    f.write(generate_shadows(80, 100, 200))
