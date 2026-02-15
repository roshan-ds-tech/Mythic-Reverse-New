import re

def main():
    # Read stars.css
    with open("stars.css", "r") as f:
        stars_content = f.read()

    # Parse layers
    # stars.css format:
    # /* Layer 1 */
    # <shadows 1>
    # 
    # /* Layer 2 */
    # <shadows 2>
    # ...
    
    layer1_match = re.search(r"/\* Layer 1 \*/\s*(.*?)\s*/\* Layer 2 \*/", stars_content, re.DOTALL)
    layer2_match = re.search(r"/\* Layer 2 \*/\s*(.*?)\s*/\* Layer 3 \*/", stars_content, re.DOTALL)
    layer3_match = re.search(r"/\* Layer 3 \*/\s*(.*)", stars_content, re.DOTALL)
    
    if not (layer1_match and layer2_match and layer3_match):
        print("Error parsing stars.css")
        return

    shadows1 = layer1_match.group(1).strip()
    shadows2 = layer2_match.group(1).strip()
    shadows3 = layer3_match.group(1).strip()

    # Read index.css
    with open("src/index.css", "r") as f:
        css_content = f.read()

    # Replace shadows in index.css
    # We look for .layer-1 { ... box-shadow: <content>; }
    # Using specific regex for each layer to be safe
    
    # Layer 1
    css_content = re.sub(
        r"(\.layer-1\s*\{[^}]*?box-shadow:\s*)([^;]+)(;)",
        lambda m: f"{m.group(1)}\n    {shadows1}{m.group(3)}",
        css_content,
        flags=re.DOTALL
    )

    # Layer 2
    css_content = re.sub(
        r"(\.layer-2\s*\{[^}]*?box-shadow:\s*)([^;]+)(;)",
        lambda m: f"{m.group(1)}\n    {shadows2}{m.group(3)}",
        css_content,
        flags=re.DOTALL
    )

    # Layer 3
    css_content = re.sub(
        r"(\.layer-3\s*\{[^}]*?box-shadow:\s*)([^;]+)(;)",
        lambda m: f"{m.group(1)}\n    {shadows3}{m.group(3)}",
        css_content,
        flags=re.DOTALL
    )

    # Write back
    with open("src/index.css", "w") as f:
        f.write(css_content)
    
    print("Successfully updated src/index.css")

if __name__ == "__main__":
    main()
