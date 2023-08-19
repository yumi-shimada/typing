// 変数の初期化
let untyped = '';
let typed = '';
let score = 0;

// 必要なHTML要素の取得
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');

// 複数テキストを格納する配列
const textlists = [
    'Hello World',
    'This is a pen',
    'This is an apple',
    'How are you?',
    'Good morning',
    'Hi! Tom',
    'I love you',
    'I need you',
    'He is Bob',
    'I send e-mail',
    'My Boss is angry',
    'I want to drink beer','I am Japanese','Let it be',
    'Typing Game','Information Technology',
    'I want to be a programmer','What day is today?',
    'I want to build a web app','Nice to meet you',
    'Chrome Firefox Edge Safari','machine learning',
    'Netscape Communications','undefined null NaN',
    'Thank you very much','Google Apple Facebook Amazon',
    'Windows Mac Linux iOS Android','programming'
];

// ランダムなテキスト表示
const createText = () => {

    // 正タイプした文字列をクリア
    typed = '';
    typedfield.textContent = typed;

    // 配列のインデックス数からランダムな数値を生成する
    let random = Math.floor(Math.random() * textlists.length);

    // 配列からランダムにテキストを取得し画面に表示する
    untyped = textlists[random];
    untypedfield.textContent = untyped;
};

// キー入力の判定
const keyPress = e => {

    // 誤タイプの場合
    if(e.key !== untyped.substring(0,1)) {
        wrap.classList.add('mistyped');
        setTimeout(() => {
            wrap.classList.remove('mistyped');
        },100);
        return;
    }

    // 正タイプの場合
    score++;
    wrap.classList.remove('mistyped');
    typed += untyped.substring(0,1);
    untyped = untyped.substring(1);
    typedfield.textContent = typed;
    untypedfield.textContent = untyped;

    // テキストがなくなったら新しいテキストを表示
    if(untyped === '') {
        createText();
    }
};

// タイピングスキルランクを判定
const rankCheck = score => {

    // テキストを格納する変数を作る
    let text = '';

    // スコアに応じたメッセージを変数に格納する
    if(score < 100) {
        text = `あなたのランクは・・・Cです！ \nBランクまであと${100 - score}文字ですよ～`;
    } else if(score < 200) {
        text = `あなたのランクは・・・Bです！ \nAランクまであと${200 - score}文字ですよ～。\nがんばれ～`;
    } else if(score < 300) {
        text = `あなたのランクは・・・Aです！ \nSランクまであと${300 - score}文字ですよ～。\nすごいすごい！`;
    } else if(score >= 300) {
        text = `あなたのランクは・・・Sです！ \nおめでとうすぎる！！`;
    }

    //生成したメッセージと一緒に文字列を返す 
    return `${score}文字打てました！\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};

// ゲームを終了
const gameOver = id => {
    clearInterval(id);
    const result = confirm(rankCheck(score));

    // OKボタンをクリックされたらリロードする
    if(result == true) {
        window.location.reload();
    }
};

// カウントダウンタイマー
const timer = () => {

    // タイマー部分のHTML要素を取得
    let time = count.textContent;

    const id = setInterval(() => {

        // カウントダウンする
        time--;
        count.textContent = time;

        // カウントが0になったらタイマーを停止する
        if(time <= 0) {
            gameOver(id);
        }
    },1000);
};

// ゲームスタート時の処理
start.addEventListener('click',() => {

    // カウントダウンタイマーを開始
    timer();

    // テキストの表示
    createText();

    // スタートボタンを非表示
    start.style.display = 'none';

    // キーボードのイベント処理
    document.addEventListener('keypress',keyPress);
});

untypedfield.textContent = 'スタートボタンで開始';


