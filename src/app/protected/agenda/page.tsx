
import Agenda from "@/pages/Agenda";
const AgendaPage = () => {
  return <Agenda onSuccess={() => {
    console.log('Agenda created successfully');
  }} />;
}

export default AgendaPage;