// ポパイネットの本番サイトでエアコンの注文を非会員で行うテスト
beforeEach(() => {
  cy.on('window:before:load', (win) => {
    // ga が未定義の場合にダミーの関数を割り当てておく
    win.ga = win.ga || function () { (win.ga.q = win.ga.q || []).push(arguments) };
    win.ga.l = +new Date();
  });
});

describe('ポパイネットの本番サイトでエアコンの注文を非会員で行うテスト', () => {
  it('エアコンの注文を法人非会員で行う', () => {
    // ポパイネットの本番サイトのトップページにアクセス
    cy.visit('https://www.popai.jp/');
    // ヘッダーの検索窓で、エアコンを入力する
    cy.get('input[name="name"]').clear().type('エアコン'); // エアコンと入力
    // 「検索」ボタンをクリック
    cy.contains('a', '検索').click();
    // エアコンのページで、特定の商品をクリック
    cy.get('img[src="/ecbl01/upload/save_image/B000054617.jpg"]').click();
    // 商品詳細ページで、工事依頼のプルダウンから工事＋引取を選択する
    cy.get('select[id="plg_productoptions_9"]') // セレクタは実際のIDやクラスに変更
      .select('28') // value属性で指定、工事を選択
      .should('have.value', '28'); // 選択されたことを検証
    // 商品詳細ページで、延長保証のプルダウンから不要を選択する、法人なので
    cy.get('select[id="plg_productoptions_7"]') // セレクタは実際のIDやクラスに変更
      .select('20') // value属性で指定、不要を選択
      .should('have.value', '20'); // 選択されたことを検証
    // 商品詳細ページで、延長保証のプルダウンから5年を選択する、法人で敢えて引っかかるかどうか見る時用
    // cy.get('select[id="plg_productoptions_7"]') 
    //   .select('14') // value属性で指定、8年を選択
    //   .should('have.value', '14'); // 選択されたことを検証
    // 商品詳細ページで、数量を入力する
    cy.get('input[name="quantity"]').clear().type('10'); // 数量を10に設定する
    // 「カゴに入れる」ボタンをクリック
    cy.contains('a', 'カゴに入れる').click();
    // ショッピングカートで商品を確認、「ご購入手続きへ」ボタンをクリック
    cy.get('input[name="confirm"]').click()
    // ログインページで、非会員なので「購入手続きへ」ボタンをクリック
    cy.get('input[name="buystep"]').click()
    // 注文フォームに必要な情報を入力 
    // 区分は法人を選択
    cy.get('input[type="radio"][name="order_personal_type"]').check('個人');
    // 姓、名、姓のフリガナ、名のフリガナを入力
    cy.get('input[name="order_name01"]').type('株式会社');
    cy.get('input[name="order_name02"]').type('てすとゆーざ');
    cy.get('input[name="order_kana01"]').type('カブシキガイシャ');
    cy.get('input[name="order_kana02"]').type('テストユーザ');
    // 郵便番号を入力、3桁と4桁を別の枠で入力
    cy.get('input[name="order_zip01"]').type('900');
    cy.get('input[name="order_zip02"]').type('0000');
    // 自動入力ボタンをクリックして都道府県と市区町村を反映させる
    cy.contains('a', '住所自動入力').click();
    // 住所の町名、番地を入力
    cy.get('input[name="order_addr01"]').type('てすと町1-2-3');
    // 住所のビル名を入力
    cy.get('input[name="order_addr02"]').type('test build.');
    // 搬入区分は一戸建を選択
    cy.get('input[name="order_building_type"]').check('1');
    // 搬入出階段情報のプルダウンから「2」階を選択
    cy.get('select[name="order_recycle_floor"]') // セレクタは実際のIDやクラスに変更
      .select('2') // value属性で指定、2階を選択
      .should('have.value', '2'); // 選択されたことを検証
    // エレベーターの有無は「なし」を選択
    cy.get('input[name="order_elevator"]').check('2');
    // 電話番号を入力 市外局番、市内局番、加入者番号を別の枠で入力
    cy.get('input[name="order_tel01"]').type('098');
    cy.get('input[name="order_tel02"]').type('888');
    cy.get('input[name="order_tel03"]').type('2222');
    // メールアドレスを入力、確認のために2回入力する
    cy.get('input[name="order_email"]').type('svcu0@futsure.co.jp');
    cy.get('input[name="order_email02"]').type('svcu0@futsure.co.jp');
    // お届け先を指定で「別のお届け先を指定」を選択
    cy.get('input[name="deliv_radio"]').check('1');
    // 区分は法人を選択
    cy.get('input[type="radio"][name="shipping_personal_type"]').check('法人');
    // 姓、名、姓のフリガナ、名のフリガナを入力
    cy.get('input[name="shipping_name01"]').type('てすと');
    cy.get('input[name="shipping_name02"]').type('Corporation');
    cy.get('input[name="shipping_kana01"]').type('テスト');
    cy.get('input[name="shipping_kana02"]').type('コーポレーション');
    // 郵便番号を入力、3桁と4桁を別の枠で入力
    cy.get('input[name="shipping_zip01"]').type('905');
    cy.get('input[name="shipping_zip02"]').type('0000');
    // 自動入力ボタンをクリックして都道府県と市区町村を反映させる
    cy.contains('a', '住所自動入力').click();
    // 住所の市区町村、町名、番地を入力
    cy.get('input[name="shipping_addr01"]').type('仮住所町1-9');
    // 住所のビル名を入力
    cy.get('input[name="shipping_addr02"]').type('てすと倉庫 A棟');
    // 搬入区分は一戸建を選択
    cy.get('input[name="shipping_building_type"]').check('1');
    // 搬入出階段情報のプルダウンから「1」階を選択
    cy.get('select[name="shipping_recycle_floor"]') // セレクタは実際のIDやクラスに変更
      .select('1') // value属性で指定、7階を選択
      .should('have.value', '1'); // 選択されたことを検証
    // エレベーターの有無は「あり」を選択
    cy.get('input[name="shipping_elevator"]').check('1');
    // 電話番号を入力 市外局番、市内局番、加入者番号を別の枠で入力
    cy.get('input[name="shipping_tel01"]').type('0980');
    cy.get('input[name="shipping_tel02"]').type('58');
    cy.get('input[name="shipping_tel03"]').type('2222');
    // 上記のお届け先のみに送るボタンをクリック
    cy.get('input[name="singular"]').click()
    // 内容を確認済ボタンをクリック
    cy.contains('a', '内容を確認済').click();
    // 配送方法の指定で沖縄を選択
    cy.get('input[name="deliv_group_id"]').check('8');
    // お支払方法の指定で「代金引換」を選択。JSでvalueが「9」のラジオボタンを選択
    cy.get('input[name="payment_id"]').check('102');
    // お届け希望日は平日を選択
    cy.get('select[name="desired_delivery_day"]') // セレクタは実際のIDやクラスに変更
      .select('平日') // value属性で指定、曜日を選択
      .should('have.value', '平日'); // 選択されたことを検証
    // お届け希望時間は選択不可なのでスルー
    // 工事希望日は平日を選択
    cy.get('select[name="const_date"]') // セレクタは実際のIDやクラスに変更
      .select('平日') // value属性で指定、曜日を選択
      .should('have.value', '平日'); // 選択されたことを検証
    // 工事連絡用電話番号を入力 市外局番、市内局番、加入者番号を別の枠で入力
    cy.get('input[name="const_tel01"]').type('090');
    cy.get('input[name="const_tel02"]').type('1111');
    cy.get('input[name="const_tel03"]').type('6666');
    // エアコンのダクト穴を選択
    cy.get('select[name="const_hole"]') // セレクタは実際のIDやクラスに変更
      .select('なし') // value属性で指定、なしを選択
      .should('have.value', 'なし'); // 選択されたことを検証
    // 室内機・室外機の階数、置き場所を選択
    cy.get('select[name="const_floor_air_conditioner"]') // セレクタは実際のIDやクラスに変更
      .select('14') // value属性で指定、14階を選択
      .should('have.value', '14'); // 選択されたことを検証
    cy.get('select[name="const_floor_outdoor_unit"]') // セレクタは実際のIDやクラスに変更
      .select('13') // value属性で指定、13階を選択
      .should('have.value', '13'); // 選択されたことを検証
    cy.get('select[name="const_floor_outdoor_unit_place"]') // セレクタは実際のIDやクラスに変更
      .select('その他') // value属性で指定、2階を選択
      .should('have.value', 'その他'); // 選択されたことを検証
    // その他お問い合わせ
    cy.get('input[name="message"]').type('てすとです。てててててててててててててててすとですすすすすすすすすすすすすす。');    
    // 確認ページへボタンをクリックして注文内容の確認
    cy.get('input[name="next"]').click()
    // 上記注意事項を了承するチェックボックスをクリック
    cy.get('input#agree').check();
    // ご注文完了ページへボタンをクリックして注文完了
    cy.get('input[name="next"]').click()
  });
});
