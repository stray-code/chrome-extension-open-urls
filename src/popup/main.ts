import van from "vanjs-core";

const App = () => {
  const { p, textarea } = van.tags;

  const readClipboardText = () => {
    const textareaElement = textarea();
    document.body.append(textareaElement);

    textareaElement.select();
    document.execCommand("paste");

    const clipboardText = textareaElement.value;
    textareaElement.remove();

    return clipboardText;
  };

  const isValidHttpUrl = (url: string) => {
    try {
      const newUrl = new URL(url);
      // 'mailto://mail@freecodecamp.org'の場合を考慮
      const isHttpUrl = ["http:", "https:"].includes(newUrl.protocol);
      return isHttpUrl;
    } catch (err) {
      return false;
    }
  };

  const init = async () => {
    const clipboardText = readClipboardText();

    const textList = clipboardText.split("\n");

    const httpUrlList = textList.filter(isValidHttpUrl);

    if (httpUrlList.length === 0) {
      return;
    }

    for (const url of httpUrlList) {
      await chrome.tabs.create({ url, active: false });
    }

    window.close();
  };

  init();

  return p(
    { style: "white-space: nowrap" },
    "クリップボードにURLがありませんでした。",
  );
};

van.add(document.getElementById("app")!, App());
