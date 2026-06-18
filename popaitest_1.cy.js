// ポパイネットの本番サイトでエアコンの注文を非会員で行うテスト
beforeEach(() => {
  cy.on('window:before:load', (win) => {
    // ga が未定義の場合にダミーの関数を割り当てておく
    win.ga = win.ga || function () { (win.ga.q = win.ga.q || []).push(arguments) };
    win.ga.l = +new Date();
  });
});

describe('ポパイネットの本番サイトでエアコンの注文を非会員で行うテスト', () => {
  it('エアコンの注文を個人非会員で行う', () => {
    // ポパイネットの本番サイトのトップページにアクセス
    cy.visit('https://www.popai.jp/');
    // 商品カテゴリから冷暖房・空調家電をクリック
    cy.get('#id_category_1004 a').click();
    // 冷暖房・空調家電のページで、特定の商品をクリック
        cy.get('img[src="/ecbl01/upload/save_image/B000055551.jpg"]').click();
    // 商品詳細ページで、工事依頼のプルダウンから希望しないを選択する
    cy.get('select[id="plg_productoptions_10"]') // セレクタは実際のIDやクラスに変更
      .select('31') // value属性で指定、希望しない（商品のみの購入）を選択
      .should('have.value', '31'); // 選択されたことを検証
    // 商品詳細ページで、延長保証のプルダウンから不要を選択する
    cy.get('select[id="plg_productoptions_7"]') // セレクタは実際のIDやクラスに変更
      .select('20') // value属性で指定、不要を選択
      .should('have.value', '20'); // 選択されたことを検証
    // 「カゴに入れる」ボタンをクリック
    cy.contains('a', 'カゴに入れる').click();
    // ショッピングカートで商品を確認、「ご購入手続きへ」ボタンをクリック
    cy.get('input[name="confirm"]').click()
    // ログインページで、非会員なので「購入手続きへ」ボタンをクリック
    cy.get('input[name="buystep"]').click()
    // 注文フォームに必要な情報を入力 
    // 区分は個人を選択
    cy.get('input[type="radio"][name="order_personal_type"]').check('個人');
    // 姓、名、姓のフリガナ、名のフリガナを入力
    cy.get('input[name="order_name01"]').type('てすと');
    cy.get('input[name="order_name02"]').type('ゆーざー');
    cy.get('input[name="order_kana01"]').type('テスト');
    cy.get('input[name="order_kana02"]').type('ユーザー');
    // 郵便番号を入力、3桁と4桁を別の枠で入力
    cy.get('input[name="order_zip01"]').type('150');
    cy.get('input[name="order_zip02"]').type('0041');
    // 都道府県をプルダウンから選択
    cy.get('select[name="order_pref"]') // セレクタは実際のIDやクラスに変更
      .select('13') // value属性で指定、東京（13）を選択
      .should('have.value', '13'); // 選択されたことを検証
    // 住所の市区町村、町名、番地を入力
    cy.get('input[name="order_addr01"]').type('渋谷区神南1-2-3');
    // 住所のビル名を入力
    cy.get('input[name="order_addr02"]').type('テストビル701');
    // 搬入区分はマンション・ビル等を選択
    cy.get('input[name="order_building_type"]').check('2');
    // 搬入出階段情報のプルダウンから「7」階を選択
    cy.get('select[name="order_recycle_floor"]') // セレクタは実際のIDやクラスに変更
      .select('7') // value属性で指定、7階を選択
      .should('have.value', '7'); // 選択されたことを検証
    // エレベーターの有無は「あり」を選択
    cy.get('input[name="order_elevator"]').check('1');
    // 電話番号を入力 市外局番、市内局番、加入者番号を別の枠で入力
    cy.get('input[name="order_tel01"]').type('03');
    cy.get('input[name="order_tel02"]').type('1234');
    cy.get('input[name="order_tel03"]').type('5678');
    // メールアドレスを入力、確認のために2回入力する
    cy.get('input[name="order_email"]').type('svcu0@futsure.co.jp');
    cy.get('input[name="order_email02"]').type('svcu0@futsure.co.jp');
    // お届け先を指定で「注文者と同じ」を選択
    cy.get('input[name="deliv_radio"]').check('0'); 
    // 上記のお届け先のみに送るボタンをクリック
    cy.get('input[name="singular"]').click()
    // 配送方法の指定で佐川急便 / ゆうパック（時間指定・可）（代引き・可） （設置不可）を選択
    cy.get('input[name="deliv_group_id"]').check('1');
    // お支払方法の指定で「代金引換」を選択。JSでvalueが「9」のラジオボタンを選択
    cy.get('input[name="payment_id"]').check('9');
    // お届け希望時間は希望なしを選択
    cy.get('#desired_delivery_time')
      .select('希望なし')
      .should('have.value', '希望なし');
   // 確認ページへボタンをクリックして注文内容の確認
    cy.get('input[name="next"]').click()
    // 上記注意事項を了承するチェックボックスをクリック
    cy.get('input#agree').check();
    // ご注文完了ページへボタンをクリックして注文完了
    cy.get('input[name="next"]').click()
  });
});
