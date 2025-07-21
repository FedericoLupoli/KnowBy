// Importa Dimensions per ottenere le dimensioni dello schermo
import { Dimensions } from 'react-native';
// Ottieni larghezza e altezza dello schermo
const { width, height } = Dimensions.get('window');

const defaultStyle = {
  container: {
    flex: 1,
    backgroundColor: '#232b2b',
  },
  header: {
    // Altezza dinamica: 18% dell'altezza dello schermo (adatta per la maggior parte dei device)
    height: height * 0.16,
    // Verde smeraldo, più vicino al verde classico e ben visibile su sfondo scuro
    //backgroundColor: '#43a047',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // Assicura che l'header occupi tutta la larghezza
    // Padding superiore per evitare overlap con status bar su iOS
    paddingTop: 20,
  },
  headerText: {
    fontFamily: 'KBFONT',
    color: '#efeff2',
    // Font size dinamico: proporzionale alla larghezza dello schermo
    fontSize: width * 0.15, // Circa 36 su uno schermo da 400px
    paddingHorizontal: width * 0.025, // Padding orizzontale dinamico
    paddingVertical: height * 0.025, // Padding verticale dinamico
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  text: {
    color: '#efeff2',
  },




  footer: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(35,43,43,0.95)', // leggermente trasparente
    paddingVertical: 14,
    borderRadius: 24,
    // Ombra per effetto floating
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
    borderTopWidth: 0, // niente bordo superiore
  },
  iconButton: {
    padding: 12,
    borderRadius: 50,
    backgroundColor: 'transparent', // o un colore se vuoi highlight
  },
  buttonFooter: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#43a047', // Verde coerente con l'header
    marginHorizontal: 8,
  },
  buttonFooterText: {
    color: '#efeff2',
    fontWeight: 'bold',
    fontSize: 16,
  },
  section: {
    backgroundColor: '#181f1f',
    borderRadius: 16,
    marginVertical: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  green: {
    color: '#00ff99',
  },
  info: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
};

export default defaultStyle;