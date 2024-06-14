function getCurrentTimestamp() {
    const now = new Date();
    // JSTはUTC+9時間のオフセットを持つため、現在の時刻に540分（9時間分）を加算する
    const jstOffset = 540; // 9 hours in minutes
    now.setMinutes(now.getMinutes() + jstOffset);
    return now.toISOString().replace('T', ' ').split('.')[0];
}

function addMessageToConsole(message, isError = false) {
    const consoleElement = document.getElementById('console');
    const timestamp = getCurrentTimestamp();
    const messageElement = document.createElement('p');
    messageElement.className = 'message';
    messageElement.innerText = `${timestamp} >> ${message}`;
    if (isError) {
        messageElement.style.color = 'red';
    } else {
        messageElement.style.color = 'green';
    }
    consoleElement.appendChild(messageElement);
    consoleElement.scrollTop = consoleElement.scrollHeight;
}

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

document.getElementById('inputText').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        generateAndCopyHash();
    }
});

function toggleTheme() {
    const themeStyle = document.getElementById('theme-style');
    if (themeStyle.href.includes('theme/light.css')) {
        themeStyle.href = 'theme/dark.css';
        saveThemePreference('dark');
    } else {
        themeStyle.href = 'theme/light.css';
        saveThemePreference('light');
    }
}

function saveThemePreference(theme) {
    localStorage.setItem('theme', theme);
}

function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeStyle = document.getElementById('theme-style');
    if (savedTheme === 'dark') {
        themeStyle.href = 'theme/dark.css';
    } else {
        themeStyle.href = 'theme/light.css';
    }
}

// ページ読み込み時に保存されたテーマを適用する
document.addEventListener('DOMContentLoaded', loadSavedTheme);
