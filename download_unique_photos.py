import os
import urllib.request

images_map = {
    # Home 1
    "idx-hero-watch.png": "photo-1523275335684-37898b6baf30",
    "idx-hero-jewellery.png": "photo-1599643478518-a784e5dc4c8f",
    "idx-hero-showroom.png": "photo-1567401893414-76b7b1e5a7a5",
    "idx-editorial-tourbillon.png": "photo-1509042239860-f550ce710b93",
    "idx-editorial-diamond.png": "photo-1605100804763-247f67b3557e",
    "idx-editorial-gold.png": "photo-1611591475179-9943486333f2",
    "idx-product-tourbillon.png": "photo-1547996160-81dfa63595aa",
    "idx-product-diamond-solitaire.png": "photo-1602751584552-8ba73aad10e1",
    "idx-product-gold-cuff.png": "photo-1598560917505-59a3ad559071",
    "idx-product-gmt-chrono.png": "photo-1526045612212-70caf35c14df",
    "idx-gifting-concierge.png": "photo-1549465220-1a8b9238cd48",

    # Home 2
    "h2-hero-parallax.png": "photo-1524805444758-089113d48a6d",
    "h2-about-heritage.png": "photo-1584308666744-24d5c474f2ae",
    "h2-masonry-1-diamond.png": "photo-1630019852942-f89202989a59",
    "h2-masonry-2-gold.png": "photo-1603561596112-0a132b757442",
    "h2-masonry-3-sapphire.png": "photo-1617038260897-41a1f14a8ca0",
    "h2-masonry-4-gifting.png": "photo-1584917865442-de89df76afd3",
    "h2-masonry-5-prestige.png": "photo-1508057198894-247b23fe5ade",
    "h2-masonry-6-bespoke.png": "photo-1535632066927-ab7c9ab60908",
    "h2-gifting-showcase.png": "photo-1513201099705-a9746e1e201f",

    # About Page
    "about-hero-watchmaker.png": "photo-1500648767791-00dcc994a43e",
    "about-team-edmund.png": "photo-1507003211169-0a1dd7228f2d",
    "about-team-caroline.png": "photo-1573496359142-b8d87734a5a2",
    "about-team-james.png": "photo-1519085360753-af0119f7cbe7",
    "about-team-amira.png": "photo-1534528741775-53994a69daeb",

    # Services Page
    "services-hero-workshop.png": "photo-1517841905240-472988babdf9",
    "services-repair-mastery.png": "photo-1582555172866-f73bb12a2ab3",

    # Blog Listing
    "blog-hero-journal.png": "photo-1513885535751-8b9238bd345a",
    "blog-featured-tourbillon.png": "photo-1522335789203-aabd1fc54bc9",
    "blog-post-1-diamond.png": "photo-1603561591411-07134e71a2a9",
    "blog-post-2-gold.png": "photo-1610375461246-83df859d849d",
    "blog-post-3-gifting.png": "photo-1512909006721-3d6018887383",
    "blog-post-4-vault.png": "photo-1441986300917-64674bd600d8",
    "blog-recent-1-tourbillon.png": "photo-1539185441755-769473a23570",
    "blog-recent-2-diamond.png": "photo-1573408301185-9146fe634ad0",
    "blog-recent-3-gold.png": "photo-1515562141207-7a88fb7ce338",
    "blog-cat-horology.png": "photo-1548036328-c9fa89d128fa",
    "blog-cat-jewellery.png": "photo-1535632066927-ab7c9ab60908",
    "blog-cat-gifting.png": "photo-1549465220-1a8b9238cd48",

    # Blog Detail
    "bdetail-hero-tourbillon.png": "photo-1523275335684-37898b6baf30",
    "bdetail-article-flying-tourbillon.png": "photo-1508057198894-247b23fe5ade",
    "bdetail-author-edmund.png": "photo-1506794778202-cad84cf45f1d",
    "bdetail-related-diamond.png": "photo-1630019852942-f89202989a59",
    "bdetail-related-gold.png": "photo-1611591475179-9943486333f2",

    # Contact Page
    "contact-hero-storefront.png": "photo-1555529669-e69e7aa0ba9a",

    # Maintenance Page
    "maintenance-bg-clockwork.png": "photo-1509042239860-f550ce710b93"
}

out_dir = r"c:\Users\russe\Desktop\watch-Jwellery\assets\images"
os.makedirs(out_dir, exist_ok=True)

# Verify uniqueness of photo IDs
photo_ids = list(images_map.values())
unique_ids = set(photo_ids)
print(f"Total entries: {len(photo_ids)}, Unique photo IDs: {len(unique_ids)}")

req_headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

for filename, photo_id in images_map.items():
    # Unsplash image download URL format
    url = f"https://images.unsplash.com/{photo_id}?w=1000&auto=format&fit=crop&q=85"
    filepath = os.path.join(out_dir, filename)
    try:
        req = urllib.request.Request(url, headers=req_headers)
        with urllib.request.urlopen(req) as response, open(filepath, 'wb') as out_file:
            out_file.write(response.read())
        print(f"Successfully downloaded: {filename}")
    except Exception as e:
        print(f"Error downloading {filename} ({photo_id}): {e}")

print("All photo downloads finished.")
