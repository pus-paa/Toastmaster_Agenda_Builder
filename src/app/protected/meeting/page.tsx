
import Meeting from "@/pages/Meeting";

const MeetingPage = () => {
  return <Meeting onSuccess={() => {
    console.log('Meeting created successfully');
  }} />;
}

export default MeetingPage;