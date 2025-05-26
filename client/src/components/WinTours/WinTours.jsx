const WinTours = (props) => {
    const usersTours = props.usersTours;

    console.log("usersTours:", usersTours);

    const toursMap = {};
    usersTours.forEach(tour => {
        const key = tour.tourId._id; // זה תמיד סטרינג
        if (!toursMap[key]) {
            toursMap[key] = [];
        }
        toursMap[key].push(tour);
    });


    console.log("toursMap:", toursMap);

    const sortedTours = Object.entries(toursMap).sort(
        (a, b) => b[1].length - a[1].length
    );

    console.log("sortedTours:", sortedTours);

    const quarterLength = Math.ceil(sortedTours.length / 4);
    console.log("quarterLength:", quarterLength);

    let topTours = sortedTours.slice(0, quarterLength);
    console.log("topTours:", topTours);

    if (topTours.length === 0) {
        topTours=sortedTours
    }

    return (
      <div>
        {topTours.map(([tourId, toursArr]) => (
          <div key={tourId}>
            <h1>Tour ID: {tourId}</h1>
            <h3>Estimated Price: {toursArr[0].tourId.estimatedPrice}</h3>
            <p>כמות הופעות: {toursArr.length}</p>
          </div>
        ))}
      </div>
    );
}
export default WinTours;