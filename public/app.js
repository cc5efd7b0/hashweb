// クライアント側でのハッシュ生成とコピー機能
function generateAndCopyHash() {
    const inputText = document.getElementById('inputText').value;
    if (!inputText) {
        addMessageToConsole('文字列を入力してください。', true);
        return;
    }

    const hash = CryptoJS.SHA512(inputText).toString(CryptoJS.enc.Hex);
    navigator.clipboard.writeText(hash).then(function() {
        addMessageToConsole('ハッシュ値がクリップボードにコピーされました。');
    }, function(err) {
        addMessageToConsole('クリップボードへのコピーに失敗しました: ' + err, true);
    });
}

function addMessageToConsole(message, isError = false) {
    const consoleElement = document.getElementById('console');
    const timestamp = new Date().toLocaleString('ja-JP', { hour12: false });
    const messageElement = document.createElement('p');
    messageElement.className = 'message';
    messageElement.innerText = `${timestamp} >> ${message}`;
    messageElement.style.color = isError ? 'red' : 'green';
    consoleElement.appendChild(messageElement);
    consoleElement.scrollTop = consoleElement.scrollHeight;
}

// Enterキーでハッシュ生成
document.getElementById('inputText').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        generateAndCopyHash();
    }
});
