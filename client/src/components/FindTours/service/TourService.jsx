let toursResults = [];

const TourService = {

    setToursResults(results) {

        return toursResults = Array.isArray(results) ? results : [];
    },

    // קבלת עד 5 סיורים ראשונים
    getProductsMini() {
        return Promise.resolve(toursResults.slice(0, 5));
    },

    // קבלת עד 10 סיורים ראשונים
    getProductsSmall() {
        return Promise.resolve(toursResults.slice(0, 10));
    },

    // קבלת כל הסיורים
    getProducts() {
        return Promise.resolve(toursResults);
    },

    // פונקציות דמו נוספות (אם תרצה להרחיב)
    getProductsWithOrdersSmall() {
        // כאן אפשר להחזיר לוגיקה אחרת אם צריך
        return Promise.resolve(toursResults.slice(0, 10));
    },

    getProductsWithOrders() {
        // כאן אפשר להחזיר לוגיקה אחרת אם צריך
        return Promise.resolve(toursResults);
    }
};
export default TourService;
