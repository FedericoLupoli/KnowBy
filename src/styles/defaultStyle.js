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
    // Grigio più scuro rispetto al background
    backgroundColor: '#232b2b',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // Assicura che l'header occupi tutta la larghezza
    // Padding superiore per evitare overlap con status bar su iOS
    paddingTop: 20,
  },
  headerText: {
    fontFamily: 'Khonsu',
    color: '#efeff2',
    // Font size dinamico: proporzionale alla larghezza dello schermo
    fontSize: width * 0.09, // Circa 36 su uno schermo da 400px
    paddingHorizontal: width * 0.025, // Padding orizzontale dinamico
    paddingVertical: height * 0.025, // Padding verticale dinamico
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  headerTagPro: {
    color: '#ffd700',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ffd700',
    // Effetto neon dorato
    backgroundColor: 'rgba(255, 215, 0, 0.1)', // Background leggermente dorato
    textShadowColor: '#ffd700',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
    // Ombra per il container (effetto glow)
    shadowColor: '#ffd700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 8,
  },
  headerTagAdmin: {
    color: '#ff3c00ff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ff3c00ff',
    // Effetto neon rosso
    backgroundColor: 'rgba(255, 60, 0, 0.1)', // Background leggermente rosso
    textShadowColor: '#ff3c00ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
    // Ombra per il container (effetto glow)
    shadowColor: '#ff3c00ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 8,
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
    backgroundColor: '#00bfff', // Azzurro coerente con i dettagli
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
  blue: {
    color: '#00bfff', // Azzurro per dettagli
  },
  info: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
};

export default defaultStyle;