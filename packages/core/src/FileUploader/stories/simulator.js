const uploadHandlers = new Map();

function clearUploadSimulationHandler(file) {
  clearInterval(uploadHandlers.get(file));
  uploadHandlers.delete(file);
}

const simulateUploadStep = (file, onProgress, onComplete, uploadSpeed) => {
  const progress = Math.min(file.progress + uploadSpeed / 4, file.size);

  onProgress(progress);

  if (file.size === progress) {
    clearUploadSimulationHandler(file);

    onComplete();
  }
};

export const simulateUpload = (
  file,
  onProgress,
  onComplete,
  uploadSpeed = 20000 /* bits per second */
) => {
  uploadHandlers.set(
    file,
    setInterval(() => {
      simulateUploadStep(file, onProgress, onComplete, uploadSpeed);
    }, 250)
  );
};

export const cancelUpload = (file) => {
  clearUploadSimulationHandler(file);
};
