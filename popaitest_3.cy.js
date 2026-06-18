// ポパイネットの本番サイトでエアコンの注文を非会員で行うテスト
beforeEach(() => {
  cy.on('window:before:load', (win) => {
    // ga が未定義の場合にダミーの関数を割り当てておく
    win.ga = win.ga || function () { (win.ga.q = win.ga.q || []).push(arguments) };
    win.ga.l = +new Date();
  });
});

describe('ポパイネットの本番サイトでエアコンの注文を会員で行うテスト', () => {
  it('エアコンの注文を個人会員で行う', () => {
    // ポパイネットの本番サイトのトップページにアクセス
    cy.visit('https://www.popai.jp/');
    // ヘッダーの検索窓で、エアコンを入力する
    cy.get('input[name="name"]').clear().type('エアコン'); // エアコンと入力
    // 「検索」ボタンをクリック
    cy.contains('a', '検索').click();
    // エアコンのページで、特定の商品をクリック
        cy.get('img[src="/ecbl01/upload/save_image/B000054661.jpg"]').click();
    // 商品詳細ページで、工事依頼のプルダウンから工事＋引取を選択する
    cy.get('select[id="plg_productoptions_11"]') // セレクタは実際のIDやクラスに変更
      .select('37') // value属性で指定、工事＋引取を選択
      .should('have.value', '37'); // 選択されたことを検証
    // 商品詳細ページで、延長保証のプルダウンから5年を選択する
    cy.get('select[id="plg_productoptions_7"]') // セレクタは実際のIDやクラスに変更
      .select('13') // value属性で指定、5年を選択
      .should('have.value', '13'); // 選択されたことを検証
    // 商品詳細ページで、数量を入力する
    cy.get('input[name="quantity"]').clear().type('1'); // 数量を1に設定し直す
    // 「カゴに入れる」ボタンをクリック
    cy.contains('a', 'カゴに入れる').click();
    // ショッピングカートで商品を確認、「ご購入手続きへ」ボタンをクリック
    cy.get('input[name="confirm"]').click()
    // ログインページでメールアドレスを入力
    cy.get('input[name="login_email"]').type('test@pt.securehatters.com');
    // パスワードを入力
    cy.get('input[name="login_pass"]').type('test2222');
    // 「ログイン」ボタンをクリック
    cy.get('input[name="log"]').click()
    // 「選択したお届け先」ボタンをクリック
    cy.get('input[name="send_button"]').click()
    // お支払方法・お届け時間等の指定
    // 配送方法の指定で佐川急便 / ゆうパック（時間指定・可）（代引き・可） （設置不可）を選択
    cy.get('input[name="deliv_group_id"]').check('1');
    // お支払方法の指定で「（前払）郵便振替」を選択。JSでvalueが「83」のラジオボタンを選択
    cy.get('input[name="payment_id"]').check('81');  
    // お届け希望日は土曜日・日曜・祭日を選択
    cy.get('select[name="desired_delivery_day"]') // セレクタは実際のIDやクラスに変更
      .select('土曜日・日曜・祭日') // value属性で指定、曜日を選択
      .should('have.value', '土曜日・日曜・祭日'); // 選択されたことを検証
    // お届け希望時間は12時～14時を選択
    cy.get('select[name="desired_delivery_time"]') // セレクタは実際のIDやクラスに変更
      .select('12時～14時') // value属性で指定、時間帯を選択
      .should('have.value', '12時～14時'); // 選択されたことを検証
    // 工事希望日は日曜・祭日を選択
    cy.get('select[name="const_date"]') // セレクタは実際のIDやクラスに変更
      .select('日曜・祭日') // value属性で指定、曜日を選択
      .should('have.value', '日曜・祭日'); // 選択されたことを検証
    // 工事連絡用電話番号を入力 市外局番、市内局番、加入者番号を別の枠で入力
    cy.get('input[name="const_tel01"]').type('080');
    cy.get('input[name="const_tel02"]').type('2222');
    cy.get('input[name="const_tel03"]').type('0000');
    // エアコンのダクト穴を選択
    cy.get('select[name="const_hole"]') // セレクタは実際のIDやクラスに変更
      .select('あり') // value属性で指定、ありを選択
      .should('have.value', 'あり'); // 選択されたことを検証
    // 室内機・室外機の階数、置き場所を選択
    cy.get('select[name="const_floor_air_conditioner"]') // セレクタは実際のIDやクラスに変更
      .select('2') // value属性で指定、2階を選択
      .should('have.value', '2'); // 選択されたことを検証
    cy.get('select[name="const_floor_outdoor_unit"]') // セレクタは実際のIDやクラスに変更
      .select('2') // value属性で指定、2階を選択
      .should('have.value', '2'); // 選択されたことを検証
    cy.get('select[name="const_floor_outdoor_unit_place"]') // セレクタは実際のIDやクラスに変更
      .select('ベランダ置き') // value属性で指定、2階を選択
      .should('have.value', 'ベランダ置き'); // 選択されたことを検証
    // その他お問い合わせ
    cy.get('input[name="message"]').type('テストです…テストですと。テストなんです。テストにて失礼いたします。');    
    // 確認ページへボタンをクリックして注文内容の確認
    cy.get('input[name="next"]').click()
    // 上記注意事項を了承するチェックボックスをクリック
    cy.get('input#agree').check();
    // ご注文完了ページへボタンをクリックして注文完了
    cy.get('input[name="next"]').click()
  });
});
