// ポパイネットの本番サイトでエアコンの注文を非会員で行うテスト
beforeEach(() => {
  cy.on('window:before:load', (win) => {
    // ga が未定義の場合にダミーの関数を割り当てておく
    win.ga = win.ga || function () { (win.ga.q = win.ga.q || []).push(arguments) };
    win.ga.l = +new Date();
  });
});

describe('ポパイネットの本番サイトでエアコンの注文を会員で行うテスト', () => {
  it('エアコンの注文を法人会員で行う', () => {
    // ポパイネットの本番サイトのトップページにアクセス
    cy.visit('https://www.popai.jp/');
    // 商品メニューから冷暖房・空調家電からホバーしてサブメニューでエアコンをクリック
    cy.get('#id_category_1004').trigger('mouseover');
    cy.get('#id_category_2054').should('be.visible').click();
    // エアコンのページで、特定の商品をクリック
        cy.get('img[src="/ecbl01/upload/save_image/B000054657.jpg"]').click();
    // 商品詳細ページで、工事依頼のプルダウンから希望しないを選択する
    cy.get('select[id="plg_productoptions_9"]') // セレクタは実際のIDやクラスに変更
      .select('27') // value属性で指定、希望しない（商品のみの購入）を選択
      .should('have.value', '27'); // 選択されたことを検証
    // 商品詳細ページで、延長保証のプルダウンから不要を選択する
    cy.get('select[id="plg_productoptions_7"]') // セレクタは実際のIDやクラスに変更
      .select('20') // value属性で指定、不要を選択
      .should('have.value', '20'); // 選択されたことを検証
    // 商品詳細ページで、数量を入力する
    cy.get('input[name="quantity"]').clear().type('3'); // 数量を3に設定
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
    // お問い合わせご名義を入力
    cy.get('input[name="contact_name"]').type('澤村　てすと');
    // 配送方法の指定で近物レックス（時間指定・不可）（代引き・不可） （設置不可）を選択
    cy.get('input[name="deliv_group_id"]').check('4');
    // お支払方法の指定で「銀行振込」を選択。JSでvalueが「81」のラジオボタンを選択
    cy.get('input[name="payment_id"]').check('81');
    // 振込名義人を入力
    cy.get('input[name="bank_payment_name"]').type('カ）フツレテスト');    
    // お届け希望日は平日を選択
    cy.get('select[name="desired_delivery_day"]') // セレクタは実際のIDやクラスに変更
      .select('平日') // value属性で指定、希望しない（商品のみの購入）を選択
      .should('have.value', '平日'); // 選択されたことを検証
   // 確認ページへボタンをクリックして注文内容の確認
    cy.get('input[name="next"]').click()
    // 上記注意事項を了承するチェックボックスをクリック
    cy.get('input#agree').check();
    // ご注文完了ページへボタンをクリックして注文完了
    cy.get('input[name="next"]').click()
  });
});
