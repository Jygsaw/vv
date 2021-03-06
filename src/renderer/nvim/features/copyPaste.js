const { ipcRenderer } = global.require('electron');
let nvim;

const handlePaste = async (event) => {
  event.preventDefault();
  event.stopPropagation();
  const clipboardText = event.clipboardData
    .getData('text')
    .replace(/</g, '<lt>');
  const { mode } = await nvim.mode;
  // :help mode
  if (mode === 'i') {
    await nvim.command('set paste');
    await nvim.input(clipboardText);
    await nvim.command('set nopaste');
  } else if (['c', 't', 'ce', 'cv', 's', 'S', 'R', 'Rv'].includes(mode)) {
    nvim.input(clipboardText);
  } else if (['no', 'r', 'rm', 'r?', '!'].includes(mode)) {
    // do nothing
  } else {
    nvim.input('"*p');
  }
};

const handleCopy = async (event) => {
  event.preventDefault();
  event.stopPropagation();
  const { mode } = await nvim.mode;
  if (mode === 'v' || mode === 'V') {
    nvim.input('"*y');
  }
};

const handleSelectAll = () => {
  nvim.input('ggVG');
};

const initCopyPaste = (newNvim) => {
  nvim = newNvim;
  document.addEventListener('copy', handleCopy);
  document.addEventListener('paste', handlePaste);
  ipcRenderer.on('selectAll', handleSelectAll);
};

export default initCopyPaste;
