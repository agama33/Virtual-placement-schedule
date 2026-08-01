const preview = document.getElementById("preview");
const prophecyButton = document.getElementById("prophecyButton");
const uploadPhotoInput = document.getElementById("uploadPhoto");
const placeholderText = document.getElementById("placeholderText");

const openCameraButton = document.getElementById("openCameraButton");
const captureButton = document.getElementById("captureButton");
const shareButton = document.getElementById("shareButton");

const video = document.getElementById("camera");
const canvas = document.getElementById("canvas");
const resultBox = document.getElementById("result");
const loadingOverlay = document.getElementById("loadingOverlay");
const loadingMessage = document.getElementById("loadingMessage");
const shareCanvas = document.getElementById("shareCanvas");

let cameraStream = null;
let isSubmitting = false;
let lastProphecy = "";
let loadingMessageTimer = null;

const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif"
];

/* ======================
   HELPERS
====================== */

function trackEvent(eventName, parameters = {}) {
  if (typeof gtag !== "function") {
    return;
  }

  gtag("event", eventName, parameters);
}

function setResult(message) {
  if (!message) {
    resultBox.textContent = "";
    resultBox.style.display = "none";
    return;
  }

  resultBox.textContent = message;
  resultBox.style.display = "block";
}

function clearResult() {
  resultBox.textContent = "";
  resultBox.style.display = "none";
}

function enableShare(prophecyText) {
  lastProphecy = prophecyText || "";
  shareButton.disabled = !lastProphecy.trim();
}

function resetShare() {
  lastProphecy = "";
  shareButton.disabled = true;
}

function showPlaceholder() {
  placeholderText.style.display = "grid";
  preview.style.display = "none";
  video.style.display = "none";
}

function showPreviewFromDataUrl(dataUrl) {
  preview.src = dataUrl;
  preview.style.display = "block";
  video.style.display = "none";
  placeholderText.style.display = "none";
  prophecyButton.disabled = false;
  clearResult();
  resetShare();
}

function showCameraInPreview() {
  preview.style.display = "none";
  video.style.display = "block";
  placeholderText.style.display = "none";
  prophecyButton.disabled = true;
  clearResult();
  resetShare();
}

function stopCamera() {
  if (cameraStream) {
    cameraStream.getTracks().forEach(track => track.stop());
    cameraStream = null;
  }

  video.srcObject = null;
  video.style.display = "none";

  captureButton.style.display = "none"; // 👈 hide it
}

function resetPreview() {
  preview.src = "";
  preview.style.display = "none";
  video.style.display = "none";
  placeholderText.style.display = "grid";
  prophecyButton.disabled = true;
  clearResult();
  resetShare();
}

function startLoadingMessages() {
  const messages = [
    "The Oracle is reading your coffee...",
    "Interpreting the patterns in the foam...",
    "Your prophecy is taking shape..."
  ];

  let messageIndex = 0;

  loadingMessage.textContent = messages[messageIndex];

  loadingMessageTimer = setInterval(() => {
    messageIndex = (messageIndex + 1) % messages.length;
    loadingMessage.textContent = messages[messageIndex];
  }, 2500);
}

function stopLoadingMessages() {
  clearInterval(loadingMessageTimer);
  loadingMessageTimer = null;
}

function setLoadingState(loading) {
  isSubmitting = loading;

  prophecyButton.disabled = loading || !preview.src;
  openCameraButton.disabled = loading;
  uploadPhotoInput.disabled = loading;
  captureButton.disabled = loading || !cameraStream;
  shareButton.disabled = loading || !lastProphecy.trim();

  loadingOverlay.classList.toggle("is-visible", loading);
  loadingOverlay.setAttribute("aria-hidden", !loading);

  if (loading) {
    startLoadingMessages();
  } else {
    stopLoadingMessages();
  }
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = event => resolve(event.target.result);
    reader.onerror = () => reject(new Error("Could not read the file."));
    reader.readAsDataURL(file);
  });
}

function blobToJpegDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = event => resolve(event.target.result);
    reader.onerror = () => reject(new Error("Could not convert image."));
    reader.readAsDataURL(blob);
  });
}

async function normaliseImageFile(file) {
  if (!file) {
    throw new Error("No file selected.");
  }

  const mimeType = (file.type || "").toLowerCase();
  const fileName = (file.name || "").toLowerCase();
  const isHeic =
    mimeType === "image/heic" ||
    mimeType === "image/heif" ||
    fileName.endsWith(".heic") ||
    fileName.endsWith(".heif");

  if (
    mimeType &&
    !ALLOWED_MIME_TYPES.includes(mimeType) &&
    !isHeic
  ) {
    throw new Error("Please upload a JPG, PNG, WEBP, or HEIC image.");
  }

  if (isHeic) {
    if (typeof heic2any === "undefined") {
      throw new Error("HEIC conversion is not available right now.");
    }

    const convertedBlob = await heic2any({
      blob: file,
      toType: "image/jpeg",
      quality: 0.9
    });

    const finalBlob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
    const dataUrl = await blobToJpegDataUrl(finalBlob);

    if (finalBlob.size > MAX_IMAGE_BYTES) {
      throw new Error("That image is too large. Please choose one under 8 MB.");
    }

    return dataUrl;
  }

  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error("That image is too large. Please choose one under 8 MB.");
  }

  return fileToDataUrl(file);
}

/* ======================
   IMAGE INPUT
====================== */

uploadPhotoInput.addEventListener("change", async event => {
  const file = event.target.files?.[0];
  if (!file) return;

  try {
    stopCamera();
    const dataUrl = await normaliseImageFile(file);
    showPreviewFromDataUrl(dataUrl);
  } catch (error) {
    resetPreview();
    setResult(error.message || "The oracle cannot read that image.");
  } finally {
    uploadPhotoInput.value = "";
    setLoadingState(false);
  }
});

openCameraButton.addEventListener("click", async () => {
  clearResult();

  try {
    stopCamera();

    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "environment"
      },
      audio: false
    });

    video.srcObject = cameraStream;
    showCameraInPreview();

    captureButton.style.display = "grid"; // 👈 show it
    captureButton.disabled = false;

  } catch (error) {
    stopCamera();
    setResult("The camera could not be opened right now.");
  }
});

captureButton.addEventListener("click", () => {
  if (!cameraStream) {
    setResult("The camera is not ready yet.");
    return;
  }

  const width = video.videoWidth;
  const height = video.videoHeight;

  if (!width || !height) {
    setResult("The oracle needs a moment before capturing.");
    return;
  }

  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  context.drawImage(video, 0, 0, width, height);

  const imageDataUrl = canvas.toDataURL("image/jpeg", 0.9);
  showPreviewFromDataUrl(imageDataUrl);
  stopCamera();
  setLoadingState(false);
});

/* ======================
   PROPHECY
====================== */

prophecyButton.addEventListener("click", async () => {
  if (!preview.src || isSubmitting) return;

  trackEvent("reading_started");

  setLoadingState(true);
  resetShare();

  try {
    const response = await fetch("/read-latte", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        imageDataUrl: preview.src
      })
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || "The oracle cannot read the foam right now.");
    }

    const prophecy = data.prophecy || "A mysterious silence hangs over this cup.";
    setResult(prophecy);
    enableShare(prophecy);
  } catch (error) {
    setResult(error.message || "The oracle cannot read the foam right now.");
    resetShare();
  } finally {
    setLoadingState(false);
  }
});

/* ======================
   SHARE
====================== */

function drawWrappedText(context, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  const lines = [];
  let line = "";

  for (const word of words) {
      const testLine = line ? line + " " + word : word;
      const metrics = context.measureText(testLine);

      if (metrics.width > maxWidth && line) {
          lines.push(line);
          line = word;
      } else {
          line = testLine;
      }
  }

  if (line) {
      lines.push(line);
  }

  // Draw centred around the supplied Y coordinate
  const startY = y - ((lines.length - 1) * lineHeight) / 2;

  lines.forEach((line, index) => {
      context.fillText(line, x, startY + index * lineHeight);
  });

  return lines.length;
}

function addPaperTexture(context, width, height) {
  context.save();

  // A fixed seed keeps the texture consistent each time the card is created.
  let seed = 48271;

  function seededRandom() {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  }

  // Fine paper grain
  for (let i = 0; i < 5500; i++) {
    const x = seededRandom() * width;
    const y = seededRandom() * height;
    const size = seededRandom() * 1.4 + 0.2;
    const opacity = seededRandom() * 0.025 + 0.008;

    context.fillStyle = `rgba(77, 58, 47, ${opacity})`;
    context.fillRect(x, y, size, size);
  }

  // A few very faint paper fibres
  context.lineWidth = 0.5;

  for (let i = 0; i < 90; i++) {
    const x = seededRandom() * width;
    const y = seededRandom() * height;
    const length = seededRandom() * 34 + 8;
    const opacity = seededRandom() * 0.018 + 0.004;

    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + length, y + seededRandom() * 4 - 2);
    context.strokeStyle = `rgba(106, 85, 70, ${opacity})`;
    context.stroke();
  }

  context.restore();
}

function createShareCard(prophecy) {
  const context = shareCanvas.getContext("2d");

  const cardWidth = 1080;
  const cardHeight = 1350;

  shareCanvas.width = cardWidth;
  shareCanvas.height = cardHeight;

  // Background gradient (matches app)
  const background = context.createLinearGradient(0, 0, 0, cardHeight);
  background.addColorStop(0, "#f8f3ed");
  background.addColorStop(1, "#efe4d6");

  context.fillStyle = background;
  context.fillRect(0, 0, cardWidth, cardHeight);

  // Add a subtle, consistent paper grain over the background
  addPaperTexture(context, cardWidth, cardHeight);

  // Subtle inset border
  context.save();

  context.strokeStyle = "rgba(77, 58, 47, 0.14)";
  context.lineWidth = 2;

  context.beginPath();
  context.roundRect(
    24,
    24,
    cardWidth - 48,
    cardHeight - 48,
    28
  );
  context.stroke();

  context.restore();

  context.textAlign = "center";

  // ---------- Title ----------
  context.fillStyle = "#4d3a2f";
  context.font = "600 54px 'Fraunces', serif";

  context.shadowColor = "rgba(80,55,35,0.12)";
  context.shadowBlur = 8;
  context.shadowOffsetX = 0;
  context.shadowOffsetY = 2;

  context.fillText("Latte Oracle", cardWidth / 2, 90);

  // Reset shadow so it doesn't affect everything else
  context.shadowColor = "transparent";
  context.shadowBlur = 0;
  context.shadowOffsetX = 0;
  context.shadowOffsetY = 0;

  // ---------- Subtitle ----------
  context.fillStyle = "#6a5546";
  context.font = "italic 32px Georgia";
  context.fillText("Today's Reading", cardWidth / 2, 140);

  // ---------- Date ----------
  const now = new Date();

  const day = now.getDate();

  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  const weekday = now.toLocaleDateString("en-GB", {
    weekday: "long"
  });

  const monthYear = now.toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric"
  });

  const formattedDate = `${weekday} ${day}${suffix} ${monthYear}`;

  context.fillStyle = "#6a5546";
  context.font = "26px Georgia";
  context.fillText(formattedDate, cardWidth / 2, 185);

  // ---------- Photo ----------
  const imageSize = 780;
  const imageX = (cardWidth - imageSize) / 2;
  const imageY = 230;

  context.save();

  context.beginPath();
  context.roundRect(imageX, imageY, imageSize, imageSize, 36);
  context.clip();

  const imageRatio = preview.naturalWidth / preview.naturalHeight;

  let sourceX = 0;
  let sourceY = 0;
  let sourceWidth = preview.naturalWidth;
  let sourceHeight = preview.naturalHeight;

  if (imageRatio > 1) {
    sourceWidth = preview.naturalHeight;
    sourceX = (preview.naturalWidth - sourceWidth) / 2;
  } else {
    sourceHeight = preview.naturalWidth;
    sourceY = (preview.naturalHeight - sourceHeight) / 2;
  }

  context.drawImage(
    preview,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    imageX,
    imageY,
    imageSize,
    imageSize
  );

  context.restore();

  // ---------- Separator ----------
  context.fillStyle = "#8b7569";
  context.font = "28px Georgia";
  context.fillText("✦", cardWidth / 2, 1055);

  // ---------- Prophecy ----------
  context.fillStyle = "#4d3a2f";
  context.font = "italic 36px Georgia";

  drawWrappedText(
    context,
    `“${prophecy}”`,
    cardWidth / 2,
    1185,
    860,
    52
);

  // ---------- Website ----------
  context.fillStyle = "#8b7569";
  context.font = "22px Inter";

  context.fillText(
    "latteoracle.com",
    cardWidth / 2,
    1315
  );
}

function canvasToBlob(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("The share card could not be created."));
        }
      },
      "image/png",
      1
    );
  });
}

shareButton.addEventListener("click", async () => {
  if (!lastProphecy) return;

  shareButton.disabled = true;

  try {
    // Make sure Fraunces and the other web fonts are ready
    // before drawing text onto the canvas.
    await document.fonts.ready;

    createShareCard(lastProphecy);

    const cardBlob = await canvasToBlob(shareCanvas);

    const cardFile = new File(
      [cardBlob],
      "latte-oracle-reading.png",
      {
        type: "image/png"
      }
    );

    const appUrl = "https://www.latteoracle.com";

    const shareText =
      `My Latte Oracle reading:\n\n` +
      `${lastProphecy}\n\n` +
      `Reveal your own at ${appUrl}`;

    // Best option: share the finished image through the native share sheet.
    if (
      navigator.share &&
      navigator.canShare &&
      navigator.canShare({ files: [cardFile] })
    ) {
      await navigator.share({
        title: "Latte Oracle",
        text: shareText,
        files: [cardFile]
      });

      return;
    }

    // Some browsers support text sharing but not file sharing.
    if (navigator.share) {
      await navigator.share({
        title: "Latte Oracle",
        text: shareText,
        url: appUrl
      });

      return;
    }

    // Desktop fallback: download the generated card.
    const downloadUrl = URL.createObjectURL(cardBlob);
    const downloadLink = document.createElement("a");

    downloadLink.href = downloadUrl;
    downloadLink.download = "latte-oracle-reading.png";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();

    URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    // Closing the native share sheet is not a genuine error.
    if (error.name !== "AbortError") {
      console.error("Sharing failed:", error);
      alert(
        "The Oracle could not share the card right now. Please try again."
      );
    }
  } finally {
    shareButton.disabled = false;
  }
});

/* ======================
   STARTUP
====================== */

resetPreview();
stopCamera();
captureButton.disabled = true;