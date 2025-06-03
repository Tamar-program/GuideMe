import FoundTours from "../FindTours/FoundTours";

const WinTours = (props) => {
    const usersTours = props.usersTours;

    console.log("usersTours:", usersTours);

    const toursMap = {};
    usersTours.forEach(tour => {
        const key = tour.tourId._id;
        if (!toursMap[key]) {
            toursMap[key] = [];
        }
        toursMap[key].push(tour);
    });

    console.log("toursMap:", toursMap);

    const sortedTours = Object.entries(toursMap).sort(
        (a, b) => b[1].length - a[1].length
    );

    const quarterLength = Math.ceil(sortedTours.length / 4);
    let topTours = sortedTours.slice(0, quarterLength).map(([tourId, toursArr]) => toursArr[0].tourId);

    if (topTours.length === 0) {
        topTours = sortedTours.map(([tourId, toursArr]) => toursArr[0].tourId);
    }

    return (
      <FoundTours topTours={topTours}/>
    );
}

export default WinTours;