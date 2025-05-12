
import Login from "./Login";
import MenuBar from "./MenuBar";


import Register from "./Register";


const grid1Style = {
    display: 'grid',         // הגדרת גריד
    gridTemplateRows: '1fr 1fr 1fr', // שלוש שורות בגובה שווה
    // gridTemplateColumns: '1fr 2fr 1fr', /* עמודות */
    height: '150vh',         // הגדרת גובה העמוד כולו
    textAlign: 'center',     // טקסט מיושר למרכז
    alignItems: 'center',    // יישור אנכי של התוכן
    fontSize: '24px',        // גודל טקסט
};

const grid2Style = {
    // background: 'lightblue', /* צבע רקע לכל תא */
    // textAlign: 'center', /* יישור טקסט */
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    display: 'grid',         // הגדרת גריד
    gridTemplateColumns: '1fr 1fr 1fr', // שלוש שורות בגובה שווה
    height: '55vh',         // הגדרת גובה העמוד כולו
    textAlign: 'center',     // טקסט מיושר למרכז
    alignItems: 'center',    // יישור אנכי של התוכן
    fontSize: '30px',        // גודל טקסט
    background: '#daa520'
    , color: 'white'
};

const grid3Style = {
    // background: 'lightblue', /* צבע רקע לכל תא */
    // textAlign: 'center', /* יישור טקסט */
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    display: 'grid',         // הגדרת גריד
    gridTemplateColumns: '1fr 1fr 1fr', // שלוש שורות בגובה שווה
    height: '40vh',         // הגדרת גובה העמוד כולו
    textAlign: 'center',     // טקסט מיושר למרכז
    alignItems: 'center',    // יישור אנכי של התוכן
    fontSize: '24px',        // גודל טקסט
    background: '255'
    , color: '#daa520'
};


const Home = () => {
    return (<>
<MenuBar/>
        <Login ></Login>
        <Register></Register>
        <div style={grid1Style}>
            <div style={grid2Style}>
                <div style={{ textalign: " center", gridColumn: '2 / 3' }}>האתר שלנו מציע חוויה ייחודית למטיילים המעוניינים לגלות את ירושלים בקצב שלהם. בעזרת הכלים המתקדמים שלנו,
                    תוכלו להרכיב מסלול סיור מותאם אישית בקלות ובמהירות. האתר מאפשר לכם לבחור את האתרים,
                    האטרקציות והמסלולים שמתאימים להעדפותיכם האישיות,
                    תוך התחשבות בזמן שברשותכם ובתחומי העניין שלכם.
                </div>
            </div>
            <div style={grid3Style}>
                <div style={{ textalign: " center", gridColumn: '2 / 3' }}>בין אם אתם מתעניינים בהיסטוריה, אמנות, דתות או פשוט רוצים לחוות את האווירה הייחודית של העיר,
                    הממשק הידידותי שלנו ידריך אתכם צעד אחר צעד בבחירת התחנות המושלמות לסיור שלכם. ירושלים מחכה לכם – התחילו את המסע האישי שלכם עוד היום!
                </div>
            </div>
            <div style={grid2Style}><div style={{ textalign: " center", gridColumn: '2 / 3' }}>❤💬☎🤙</div></div>
        </div>
       
        {/* <div style={grid1Style}>
  <div class={grid2Style}>1</div>
  <div class={grid2Style}>2</div>
  <div class={grid2Style}>3</div>
  <div class={grid2Style}>4</div>
  <div class={grid2Style}>5</div>
  <div class={grid2Style}>6</div>
</div> */}



    </>)
}

export default Home;