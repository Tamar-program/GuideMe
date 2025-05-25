const FoundTours = ({ results = [] }) => {
  return (
    <div className="find-tours">
      <h1>Find Tours</h1>
        {
                results.length > 0 && (
                    <div>
                        <h3>תוצאות:</h3>
                        <div>
                            {results.map((tour, idx) => (
                                <div> key={tour._id || idx}
                                    {tour.name} - {tour.shortDescription}
                                </div>
                            ))}
                        </div>
                    </div>
                )
            }
    </div>
  );
}
export default FoundTours;