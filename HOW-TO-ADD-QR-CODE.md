# How to Add Your Payment QR Code

## Quick Steps

1. **Save your QR code image** as `qr-code-payment.png`

2. **Place it here:**
   ```
   Hackathon-Master-Plan/artifacts/hackathon/public/qr-code-payment.png
   ```

3. **Refresh the browser** - The QR code will appear automatically!

## Current Status

✅ Registration form is configured and ready
✅ QR code section created with proper styling
✅ Temporary SVG placeholder is showing (with Google Pay style colors)
⏳ Waiting for your actual QR code image

## Image Specifications

- **Format:** PNG or JPG (PNG recommended)
- **Size:** 500x500 pixels or larger (square format)
- **File name:** `qr-code-payment.png` (exactly this name)
- **Location:** `public` folder in the hackathon artifact

## To Replace the Placeholder

Simply save your QR code image from the screenshot you provided as:
```
Hackathon-Master-Plan/artifacts/hackathon/public/qr-code-payment.png
```

The image from your screenshot (with the Google Pay logo in the center) will work perfectly!

## What the Form Shows

The registration form payment section displays:
- Large QR code image (256x256px display size)
- UPI ID below the QR code
- Amount: ₹350
- Instructions: "Open any UPI app (GPay, PhonePe, Paytm) to scan"
- Warning to save payment receipt

## Fallback Behavior

- First tries to load: `/qr-code-payment.png`
- If PNG not found, falls back to: `/qr-code-payment.svg` (placeholder)

Right now, the SVG placeholder is showing until you add your actual QR code image!
