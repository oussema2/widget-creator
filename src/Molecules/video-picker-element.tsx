const VideoPickerElement = ({ options }: { options: any }) => {
  return (
    <div className="w-[150px] h-[150px] rounded-[10px]">
      <img src={options.thumbnail} className="w-full h-full object-cover" />
    </div>
  );
};

export default VideoPickerElement;
