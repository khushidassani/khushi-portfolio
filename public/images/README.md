# Images

Drop your photos here and reference them in the component.

## How to use

1. Add your image file to this folder, e.g. `hero.jpg`
2. Reference it in `app/components/Portfolio.tsx`

## Photo slots

### Hero left panel background
In `Portfolio.tsx`, find `.hero-photo-bg` div and update the `style` prop:
```
style={{ backgroundImage: "url('/images/hero.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
```

### Hero right panel photo (click-to-upload)
The hero right panel has a click-to-upload placeholder. Click it in the browser to upload a photo from your device. To hardcode one instead, set `photoUploaded = true` and `photoUrl = '/images/your-photo.jpg'` as default state values.

### Floating card mini-images (top-right of hero)
Find the `.hf-item` divs and add a style prop:
```
style={{ backgroundImage: "url('/images/card1.jpg')" }}
```

### Project hero backgrounds
Find each `.proj-hero-img` div and replace the gradient with:
```
style={{ backgroundImage: "url('/images/project1.jpg')", backgroundSize: "cover" }}
```

### Project circular thumbnails
Find `.proj-thumb` divs and add:
```
style={{ backgroundImage: "url('/images/thumb1.jpg')" }}
```

### Project photo grid (bottom strip of each card)
Find `.ppg-item` divs and add `backgroundImage` to their style prop.
