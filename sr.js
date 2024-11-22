// 在文件开头添加音频自动播放的代码
window.addEventListener('load', function() {
    // 获取音频元素
    const birthdayAudio = document.getElementById('birthday-audio');
    
    // 尝试播放音频
    const playAudio = async () => {
        try {
            await birthdayAudio.play();
        } catch (err) {
            console.log('自动播放失败，等待用户交互:', err);
            // 添加点击事件监听器来播放音频
            document.addEventListener('click', function playOnClick() {
                birthdayAudio.play();
                document.removeEventListener('click', playOnClick);
            }, { once: true });
        }
    };
    
    playAudio();
    
    // 确保音频循环播放
    birthdayAudio.addEventListener('ended', function() {
        birthdayAudio.currentTime = 0;
        birthdayAudio.play();
    });
});

function showGiftMessage() {
    alert("曹燕生日快乐，你的礼物在北门蛋糕店，请及时领取。");
}

// 创建特殊的emoji效果
function createSpecialEmoji(emoji) {
    const emojiElement = document.createElement('div');
    emojiElement.className = 'special-emoji';
    emojiElement.innerText = emoji;
    document.body.appendChild(emojiElement);

    // 移除 emoji
    setTimeout(() => {
        document.body.removeChild(emojiElement);
    }, 1000);
}

// 更新消息框内容
function updateMessageBox(message) {
    const messageBox = document.getElementById('message-box');
    messageBox.textContent = message;
}

// 祝福语和雪花效果的代码保持不变
const blessings = [
    "祝你生日快乐！",
    "愿你拥有美好的未来！",
    "祝你心想事成！",
    "愿你的人生如意顺利！"
];

// 创建祝福语弹幕
blessings.forEach(blessing => {
    const barrage = document.createElement('div');
    barrage.className = 'barrage';
    barrage.innerText = blessing;
    barrage.style.color = getRandomColor(); // 设置随机颜色
    document.body.appendChild(barrage);

    // 设置随机位置和动画时长
    barrage.style.top = `${Math.random() * 100}vh`;
    barrage.style.animationDuration = `${Math.random() * 5 + 5}s`; // 5到10秒之间
});

// 雪花效果
setInterval(() => {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.innerText = '❄️'; // 雪花符号
    snowflake.style.left = `${Math.random() * 100}vw`; // 随机水平位置
    snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`; // 2到5秒之间
    document.body.appendChild(snowflake);

    // 移除雪花
    setTimeout(() => {
        document.body.removeChild(snowflake);
    }, 5000); // 5秒后移除
}, 300); // 每300毫秒生成一个雪花

// 随机显示 emoji
const emojis = ['🎉', '🎂', '🎈', '🥳', '🎊'];
document.addEventListener('mousemove', (event) => {
    const emoji = document.createElement('div');
    emoji.className = 'emoji';
    emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.left = `${event.pageX}px`;
    emoji.style.top = `${event.pageY}px`;
    document.body.appendChild(emoji);

    // 移除 emoji
    setTimeout(() => {
        document.body.removeChild(emoji);
    }, 500); // 0.5秒后移除
});

// 获取随机颜色
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// 初始化正确按钮的位置
let correctButtonIndex = Math.floor(Math.random() * 4);

// 创建音频元素
const correctSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3'); // 正确按钮音效
const wrongSound = new Audio('https://assets.mixkit.co/active_storage/sfx/1602/1602-preview.mp3');   // 错误按钮音效

// 预加载音频
correctSound.load();
wrongSound.load();

// 为按钮添加点击事件
function initializeButtons() {
    const buttons = document.querySelectorAll('.gift-button');
    buttons.forEach((button, index) => {
        button.addEventListener('click', async () => {
            if (index === correctButtonIndex) {
                try {
                    await correctSound.play(); // 播放正确音效
                } catch (error) {
                    console.log('音频播放失败:', error);
                }
                updateMessageBox("曹燕生日快乐，你的礼物在北门东湖小区彩票店存放，请及时领取。");
                createSpecialEmoji('🎂');
            } else {
                try {
                    await wrongSound.play(); // 播放错误音效
                } catch (error) {
                    console.log('音频播放失败:', error);
                }
                updateMessageBox("继续找找看~");
                createSpecialEmoji('🤡');
            }
            // 重新随机分配正确按钮的位置
            correctButtonIndex = Math.floor(Math.random() * 4);
            // 重新排列按钮文本
            shuffleButtonTexts();
        });
    });
}

// 随机排列按钮文本
function shuffleButtonTexts() {
    const buttons = document.querySelectorAll('.gift-button');
    const texts = ['礼物1', '礼物2', '礼物3', '礼物4'];
    texts.sort(() => Math.random() - 0.5);
    buttons.forEach((button, index) => {
        button.textContent = texts[index];
    });
}

// 页面加载时初始化按钮
window.addEventListener('load', () => {
    initializeButtons();
    shuffleButtonTexts();
});
