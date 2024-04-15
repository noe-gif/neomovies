const Trailer = ({ trailer }: any) => {
  return (
    <iframe
      src={`https://www.youtube.com/embed/${
        trailer.results.find((item: any) => item.type === 'Trailer').key
      }?autoplay=1&showinfo=0&mute=1&loop=1&color=white&controls=0&modestbranding=1&playsinline=1&rel=0&enablejsapi=1&playlist=${
        trailer.results.find((item: any) => item.type === 'Trailer').key
      }`}
      title="YouTube video player"
      style={{
        position: 'absolute',
        top: '-150px',
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        border: '0px',
      }}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
};

export default Trailer;
