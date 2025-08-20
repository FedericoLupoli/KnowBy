# Contributing to KnowBy

Grazie per il tuo interesse nel contribuire a **KnowBy**! 🎉

Questo documento fornisce linee guida e informazioni per contribuire efficacemente al progetto. La tua collaborazione è molto apprezzata e aiuta a migliorare la piattaforma per studenti e tutor.

## 📋 Indice

- [🤝 Come Contribuire](#-come-contribuire)
- [🚀 Configurazione Ambiente di Sviluppo](#-configurazione-ambiente-di-sviluppo)
- [📝 Linee Guida per i Contributi](#-linee-guida-per-i-contributi)
- [🐛 Segnalazione Bug](#-segnalazione-bug)
- [✨ Richiesta Nuove Funzionalità](#-richiesta-nuove-funzionalità)
- [💻 Sviluppo Codice](#-sviluppo-codice)
- [🧪 Testing](#-testing)
- [📚 Documentazione](#-documentazione)
- [👥 Community e Comunicazione](#-community-e-comunicazione)

---

## 🤝 Come Contribuire

Ci sono molti modi per contribuire a KnowBy:

### 🔧 Contributi Tecnici
- **Correzione bug** 🐛
- **Sviluppo nuove funzionalità** ✨
- **Miglioramento performance** ⚡
- **Refactoring codice** 🔄
- **Aggiornamento dipendenze** 📦

### 📖 Contributi Non-Tecnici
- **Miglioramento documentazione** 📝
- **Traduzioni** 🌍
- **Test dell'applicazione** 🧪
- **Segnalazione bug** 🐛
- **Feedback UI/UX** 🎨

### 🏷️ Tipi di Contributi Benvenuti

| Tipo | Difficoltà | Tempo Stimato | Esempio |
|------|------------|---------------|---------|
| 🐛 **Bug Fix** | 🟢 Facile | 1-3 ore | Correzione layout responsive |
| ✨ **Feature** | 🟡 Media | 1-2 giorni | Aggiunta filtri ricerca |
| 🔄 **Refactor** | 🟠 Difficile | 2-5 giorni | Ristrutturazione navigazione |
| 📝 **Docs** | 🟢 Facile | 30min-2 ore | Aggiornamento README |
| 🌍 **i18n** | 🟢 Facile | 1-2 ore | Traduzione in nuova lingua |

---

## 🚀 Configurazione Ambiente di Sviluppo

### 📋 Prerequisiti

Assicurati di avere installato:

```bash
# Verifica versioni richieste
node --version    # >= 18.0.0
npm --version     # >= 9.0.0
git --version     # >= 2.30.0
```

**Software richiesto:**
- **Node.js** v18.0.0+ ([Download](https://nodejs.org/))
- **Git** per version control
- **Expo CLI**: `npm install -g @expo/cli`
- **Expo Go** app sui tuoi dispositivi mobili

**Editor consigliati:**
- [VS Code](https://code.visualstudio.com/) con estensioni React Native
- [WebStorm](https://www.jetbrains.com/webstorm/) con plugin React Native

### ⚡ Setup Veloce

```bash
# 1. Fork e clona il repository
git clone https://github.com/TUO_USERNAME/KnowByDEV.git
cd KnowByDEV

# 2. Aggiungi upstream remoto
git remote add upstream https://github.com/FedericoLupoli/KnowByDEV.git

# 3. Installa dipendenze
npm install

# 4. Copia e configura variabili d'ambiente
cp .env.example .env
# Modifica .env con le tue configurazioni

# 5. Avvia ambiente di sviluppo
npm start

# 6. Testa su dispositivo con Expo Go
# Scansiona il QR code mostrato nel terminale
```

### 🔧 Configurazione Avanzata

<details>
<summary><strong>🔧 Configurazione IDE (VS Code)</strong></summary>

Installa le seguenti estensioni per VS Code:

```json
{
  "recommendations": [
    "ms-vscode.vscode-react-native",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

Configurazione workspace (`.vscode/settings.json`):

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  }
}
```

</details>

<details>
<summary><strong>📱 Setup Dispositivi di Test</strong></summary>

**Android:**
- Installa [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent)
- Abilita Developer Options e USB Debugging
- Connetti al PC tramite USB o WiFi

**iOS:**
- Installa [Expo Go](https://apps.apple.com/app/expo-go/id982107779)
- Assicurati che iPhone e PC siano sulla stessa rete WiFi
- Scansiona QR code dalla fotocamera o Expo Go

**Emulatori:**
```bash
# Android Studio (consigliato)
# Configura AVD Manager con Android 11+ (API 30+)

# iOS Simulator (solo macOS)
# Xcode > Open Developer Tool > Simulator
```

</details>

---

## 📝 Linee Guida per i Contributi

### 🎯 Filosofia del Progetto

KnowBy mira a essere:
- **User-friendly**: Interfaccia intuitiva per tutti i livelli di utenti
- **Performante**: Caricamenti rapidi e animazioni fluide
- **Sicuro**: Protezione dati e privacy degli utenti
- **Accessibile**: Compatibile con screen reader e dispositivi assistivi
- **Cross-platform**: Funzionalità consistenti tra iOS e Android

### 📏 Standard di Qualità

Prima di inviare un contributo, assicurati che:

- [ ] **Codice pulito**: Segue le convenzioni del progetto
- [ ] **Testing**: Include test appropriati per nuove funzionalità
- [ ] **Documentazione**: Commenti e documentazione aggiornati
- [ ] **Performance**: Non introduce rallentamenti significativi
- [ ] **Accessibilità**: Supporta screen reader e navigazione tastiera
- [ ] **Mobile-first**: Ottimizzato per esperienza mobile

### 🗂️ Workflow Git

Utilizziamo **Git Flow** con alcune modifiche per il mobile development:

```bash
# Branch principali
main         # Produzione stabile
develop      # Sviluppo attivo
feature/*    # Nuove funzionalità
bugfix/*     # Correzioni bug
hotfix/*     # Patch urgenti
release/*    # Preparazione release
```

**Workflow tipico:**

```bash
# 1. Aggiorna develop locale
git checkout develop
git pull upstream develop

# 2. Crea branch feature
git checkout -b feature/nome-funzionalita

# 3. Sviluppa e committa
git add .
git commit -m "feat: aggiunta ricerca vocale"

# 4. Push e apri Pull Request
git push origin feature/nome-funzionalita
```

### 📝 Convenzioni Commit

Utilizziamo [Conventional Commits](https://www.conventionalcommits.org/) con scope specifici per mobile:

```bash
# Formato: <tipo>(<scope>): <descrizione>

# Tipi principali
feat:       # Nuova funzionalità
fix:        # Correzione bug
docs:       # Solo documentazione
style:      # Formattazione (non logica)
refactor:   # Refactoring senza nuove funzionalità
test:       # Aggiunta/modifica test
chore:      # Task manutenzione (dipendenze, config)
perf:       # Miglioramento performance
build:      # Sistema di build
ci:         # Continuous Integration

# Scope specifici del progetto
(auth)      # Sistema autenticazione
(nav)       # Navigazione
(ui)        # Componenti interfaccia
(api)       # Integrazione API
(search)    # Funzionalità ricerca
(profile)   # Gestione profilo
(chat)      # Sistema messaggi
(settings)  # Configurazioni app

# Esempi pratici
feat(auth): aggiungi autenticazione biometrica
fix(ui): correggi overflow su Android
docs(api): aggiorna documentazione endpoints
style(nav): migliora spaziatura bottom navigation
refactor(search): ottimizza algoritmo filtri
test(profile): aggiungi test validazione form
perf(ui): riduce re-render componenti
```

---

## 🐛 Segnalazione Bug

### 🔍 Prima di Segnalare

1. **Cerca nelle issue esistenti** se il bug è già stato segnalato
2. **Aggiorna l'app** alla versione più recente
3. **Testa su dispositivo pulito** per escludere problemi locali
4. **Raccogli informazioni dettagliate** sull'ambiente

### 📋 Template Segnalazione Bug

Usa questo template quando apri una [nuova issue](https://github.com/FedericoLupoli/KnowByDEV/issues/new):

```markdown
**🐛 Descrizione Bug**
Descrizione chiara e concisa del problema.

**🔄 Passi per Riprodurre**
1. Vai a '...'
2. Clicca su '...'
3. Scorri fino a '...'
4. Vedi errore

**✅ Comportamento Atteso**
Cosa ti aspettavi che accadesse.

**❌ Comportamento Attuale**
Cosa è accaduto invece.

**📱 Informazioni Ambiente**
- **OS**: [iOS 17.2 / Android 14]
- **Dispositivo**: [iPhone 15 Pro / Samsung Galaxy S24]
- **Versione App**: [0.2.4]
- **Versione Expo**: [53.0.20]

**📸 Screenshot**
Se applicabili, aggiungi screenshot per spiegare il problema.

**📋 Log Console**
```
Incolla qui eventuali log di errore
```

**🔧 Tentativi di Risoluzione**
Cosa hai già provato per risolvere il problema.

**📎 Informazioni Aggiuntive**
Qualsiasi altro contesto sul problema.
```

### 🚨 Bug Critici

Per bug che impediscono l'uso dell'app:

1. **Aggiungi label** `🚨 critical` alla issue
2. **Menziona** `@FedericoLupoli` nella descrizione
3. **Fornisci** log dettagliati e video se possibile
4. **Testa** su più dispositivi se disponibili

---

## ✨ Richiesta Nuove Funzionalità

### 💡 Processo di Proposta

1. **Discussione preliminare**: Apri una [Discussion](https://github.com/FedericoLupoli/KnowByDEV/discussions) per feedback iniziali
2. **Validazione idea**: Il team valuta fattibilità e allineamento
3. **Issue formale**: Se approvata, viene creata una issue con dettagli tecnici
4. **Sviluppo**: Assegnazione e implementazione

### 📋 Template Feature Request

```markdown
**🚀 Funzionalità Richiesta**
Descrizione chiara e concisa della funzionalità desiderata.

**🎯 Problema da Risolvere**
Quale problema risolve questa funzionalità? Perché è importante?

**💡 Soluzione Proposta**
Descrivi come vorresti che la funzionalità funzioni.

**🔄 Flusso Utente**
1. L'utente apre...
2. Naviga verso...
3. Compie l'azione...
4. Vede il risultato...

**🎨 Mockup/Wireframe**
Se hai idee per l'interfaccia, condividi sketch o mockup.

**📱 Considerazioni Piattaforma**
- Comportamento specifico iOS/Android
- Integrazione con funzionalità native
- Prestazioni su dispositivi meno potenti

**🔗 Alternative Considerate**
Altre soluzioni che hai considerato e perché non sono adatte.

**📊 Priorità**
- [ ] 🔥 Critica (blocca utilizzo app)
- [ ] 🚀 Alta (migliora significativamente UX)
- [ ] 📈 Media (nice-to-have)
- [ ] 🎨 Bassa (miglioramento estetico)

**👥 Beneficiari**
Chi beneficerebbe di questa funzionalità? (studenti, tutor, admin)
```

### 🗺️ Roadmap Priorità

Le richieste vengono valutate in base a:

1. **Impatto utente** (quanti utenti ne beneficiano)
2. **Allineamento strategico** (obiettivi del prodotto)
3. **Complessità tecnica** (effort richiesto)
4. **Dipendenze** (altre funzionalità prerequisite)

---

## 💻 Sviluppo Codice

### 🏗️ Architettura del Progetto

```
src/
├── components/          # Componenti riutilizzabili
│   ├── common/         # Componenti base (Button, Input, etc.)
│   ├── specialized/    # Componenti specifici dominio
│   └── layout/         # Header, Footer, Navigation
├── screens/            # Schermate principali
├── context/            # Gestione stato globale
├── utils/              # Funzioni utility
├── config/             # Configurazioni
└── styles/             # Temi e stili condivisi
```

### 📐 Convenzioni Codice

#### **Nomenclatura**

```javascript
// ✅ Componenti: PascalCase
const TutorCard = () => {};
const SearchFilters = () => {};

// ✅ File: kebab-case o PascalCase per componenti
tutor-card.js
SearchFilters.js

// ✅ Variabili/funzioni: camelCase
const userName = 'Federico';
const fetchTutorList = async () => {};

// ✅ Costanti: UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.knowby.dev';
const DEFAULT_TIMEOUT = 5000;

// ✅ Context/Hooks: camelCase con prefisso
const useAuth = () => {};
const useSearch = () => {};
```

#### **Struttura Componenti**

```javascript
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

// Import context/hooks
import { useAuth } from '../context/AuthContext';

// Import componenti
import Button from './common/Button';

// Import stili
import { colors, spacing } from '../styles/defaultStyle';

/**
 * Componente per visualizzare la card di un tutor
 * @param {Object} tutor - Dati del tutor
 * @param {Function} onPress - Callback al tap sulla card
 */
const TutorCard = ({ tutor, onPress }) => {
  // ✅ State locale
  const [isLoading, setIsLoading] = useState(false);
  
  // ✅ Context/hooks
  const { user } = useAuth();
  
  // ✅ Effects
  useEffect(() => {
    // Setup iniziale
  }, []);
  
  // ✅ Handler functions
  const handlePress = () => {
    setIsLoading(true);
    onPress(tutor);
    setIsLoading(false);
  };
  
  // ✅ Render helpers (se necessario)
  const renderRating = () => (
    <Text style={styles.rating}>
      ⭐ {tutor.rating}
    </Text>
  );
  
  // ✅ Main render
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{tutor.name}</Text>
      {renderRating()}
      <Button 
        title="Contatta" 
        onPress={handlePress}
        loading={isLoading}
      />
    </View>
  );
};

// ✅ PropTypes
TutorCard.propTypes = {
  tutor: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    rating: PropTypes.number,
  }).isRequired,
  onPress: PropTypes.func.isRequired,
};

// ✅ Stili
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.sm,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  rating: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});

export default TutorCard;
```

#### **Gestione Stato**

```javascript
// ✅ Context per stato globale
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const login = async (credentials) => {
    try {
      setIsLoading(true);
      const userData = await authAPI.login(credentials);
      setUser(userData);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <AuthContext.Provider value={{ user, login, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
```

#### **API Integration**

```javascript
// ✅ Service API centralizzato
class ApiService {
  constructor() {
    this.baseURL = process.env.EXPO_PUBLIC_API_URL;
    this.timeout = 10000;
  }
  
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      timeout: this.timeout,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };
    
    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }
  
  // Metodi specifici
  async getTutors(filters = {}) {
    return this.request('/tutors', {
      method: 'GET',
      params: filters,
    });
  }
}

export default new ApiService();
```

### 🎨 Styling Guidelines

#### **Theme System**

```javascript
// styles/defaultStyle.js
export const colors = {
  // Colori primari
  primary: '#4CAF50',
  primaryDark: '#388E3C',
  primaryLight: '#81C784',
  
  // Colori di superficie
  background: '#121212',
  surface: '#1E1E1E',
  surfaceVariant: '#2D2D2D',
  
  // Colori testo
  text: '#FFFFFF',
  textSecondary: '#B3B3B3',
  textDisabled: '#666666',
  
  // Status colors
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  weights: {
    light: '300',
    regular: '400',
    medium: '500',
    bold: '700',
  },
};
```

#### **Responsive Design**

```javascript
import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const breakpoints = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
};

export const isTablet = width >= breakpoints.tablet;
export const isMobile = width < breakpoints.mobile;

// Helper per stili responsive
export const responsive = (mobileStyle, tabletStyle) => {
  return isTablet ? tabletStyle : mobileStyle;
};

// Esempio utilizzo
const styles = StyleSheet.create({
  container: {
    padding: responsive(spacing.sm, spacing.md),
    fontSize: responsive(typography.sizes.sm, typography.sizes.md),
  },
});
```

### 🔧 Performance Best Practices

#### **Ottimizzazione Rendering**

```javascript
// ✅ Usa React.memo per componenti puri
const TutorCard = React.memo(({ tutor, onPress }) => {
  // Component implementation
});

// ✅ useCallback per funzioni stabili
const TutorList = () => {
  const handleTutorPress = useCallback((tutor) => {
    navigation.navigate('TutorDetail', { tutorId: tutor.id });
  }, [navigation]);
  
  // ✅ useMemo per calcoli costosi
  const filteredTutors = useMemo(() => {
    return tutors.filter(tutor => 
      tutor.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [tutors, searchTerm]);
};

// ✅ FlatList per liste lunghe
<FlatList
  data={tutors}
  renderItem={({ item }) => (
    <TutorCard tutor={item} onPress={handleTutorPress} />
  )}
  keyExtractor={(item) => item.id}
  getItemLayout={(data, index) => ({
    length: 120,
    offset: 120 * index,
    index,
  })}
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  windowSize={10}
/>
```

#### **Gestione Immagini**

```javascript
// ✅ Lazy loading immagini
import { Image } from 'expo-image';

const TutorAvatar = ({ uri, size = 60 }) => (
  <Image
    source={{ uri }}
    style={{ width: size, height: size, borderRadius: size / 2 }}
    placeholder={require('../assets/images/avatar-placeholder.png')}
    contentFit="cover"
    transition={200}
  />
);

// ✅ Ottimizzazione bundle immagini
// Usa formato WebP quando possibile
// Comprimi immagini prima del bundle
// Considera lazy loading per immagini non critiche
```

---

## 🧪 Testing

### 🔧 Setup Testing Environment

```bash
# Installa dipendenze testing
npm install --save-dev jest @testing-library/react-native @testing-library/jest-native

# Configura jest.config.js
echo '{
  "preset": "jest-expo",
  "setupFilesAfterEnv": ["@testing-library/jest-native/extend-expect"],
  "transformIgnorePatterns": [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)"
  ]
}' > jest.config.js
```

### 📝 Tipi di Test

#### **Unit Tests**

```javascript
// __tests__/utils/validation.test.js
import { validateEmail, validatePassword } from '../src/utils/validation';

describe('Validation Utils', () => {
  describe('validateEmail', () => {
    test('should return true for valid email', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name+tag@domain.co.uk')).toBe(true);
    });
    
    test('should return false for invalid email', () => {
      expect(validateEmail('invalid.email')).toBe(false);
      expect(validateEmail('')).toBe(false);
      expect(validateEmail(null)).toBe(false);
    });
  });
  
  describe('validatePassword', () => {
    test('should return true for strong password', () => {
      expect(validatePassword('StrongP@ss123')).toBe(true);
    });
    
    test('should return false for weak password', () => {
      expect(validatePassword('weak')).toBe(false);
      expect(validatePassword('12345678')).toBe(false);
    });
  });
});
```

#### **Component Tests**

```javascript
// __tests__/components/TutorCard.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TutorCard from '../src/components/TutorCard';

const mockTutor = {
  id: '1',
  name: 'John Doe',
  subject: 'Mathematics',
  rating: 4.5,
  avatar: 'https://example.com/avatar.jpg',
};

describe('TutorCard', () => {
  test('renders tutor information correctly', () => {
    const { getByText, getByTestId } = render(
      <TutorCard tutor={mockTutor} onPress={() => {}} />
    );
    
    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('Mathematics')).toBeTruthy();
    expect(getByText('⭐ 4.5')).toBeTruthy();
  });
  
  test('calls onPress when tapped', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <TutorCard tutor={mockTutor} onPress={mockOnPress} />
    );
    
    fireEvent.press(getByTestId('tutor-card'));
    expect(mockOnPress).toHaveBeenCalledWith(mockTutor);
  });
  
  test('shows loading state when pressed', () => {
    const { getByTestId, getByText } = render(
      <TutorCard tutor={mockTutor} onPress={() => {}} />
    );
    
    fireEvent.press(getByTestId('contact-button'));
    expect(getByText('Loading...')).toBeTruthy();
  });
});
```

#### **Integration Tests**

```javascript
// __tests__/integration/auth-flow.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { AuthProvider } from '../src/context/AuthContext';
import LoginScreen from '../src/screens/ProfileLogin';

const renderWithAuth = (component) => {
  return render(
    <AuthProvider>
      {component}
    </AuthProvider>
  );
};

describe('Authentication Flow', () => {
  test('user can login with valid credentials', async () => {
    const { getByPlaceholderText, getByText } = renderWithAuth(
      <LoginScreen />
    );
    
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Accedi');
    
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.press(loginButton);
    
    await waitFor(() => {
      expect(getByText('Benvenuto!')).toBeTruthy();
    });
  });
  
  test('shows error for invalid credentials', async () => {
    const { getByPlaceholderText, getByText } = renderWithAuth(
      <LoginScreen />
    );
    
    fireEvent.changeText(getByPlaceholderText('Email'), 'wrong@email.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'wrongpass');
    fireEvent.press(getByText('Accedi'));
    
    await waitFor(() => {
      expect(getByText('Credenziali non valide')).toBeTruthy();
    });
  });
});
```

### 🧪 Test Commands

```bash
# Esegui tutti i test
npm test

# Esegui test in watch mode
npm test -- --watch

# Esegui test con coverage
npm test -- --coverage

# Esegui solo test modificati
npm test -- --changedSince=main

# Esegui test specifici
npm test TutorCard.test.js

# Debug test
npm test -- --verbose
```

### 📊 Coverage Requirements

Mantieni almeno:
- **80%** statement coverage
- **75%** branch coverage
- **80%** function coverage
- **80%** line coverage

```bash
# Controlla coverage report
npm test -- --coverage --coverageReporters=text-lcov | npx lcov-viewer
```

---

## 📚 Documentazione

### 📝 Documentazione Codice

#### **JSDoc Comments**

```javascript
/**
 * Gestisce l'autenticazione degli utenti nell'applicazione
 * @module AuthService
 */

/**
 * Effettua il login dell'utente
 * @async
 * @function login
 * @param {Object} credentials - Credenziali di accesso
 * @param {string} credentials.email - Email dell'utente
 * @param {string} credentials.password - Password dell'utente
 * @returns {Promise<Object>} Dati dell'utente autenticato
 * @throws {Error} Errore se le credenziali sono invalide
 * 
 * @example
 * // Login utente
 * try {
 *   const user = await AuthService.login({
 *     email: 'user@example.com',
 *     password: 'securePassword123'
 *   });
 *   console.log('Logged in:', user.name);
 * } catch (error) {
 *   console.error('Login failed:', error.message);
 * }
 */
const login = async ({ email, password }) => {
  // Implementation
};
```

#### **README per Componenti**

Ogni componente complesso dovrebbe avere la sua documentazione:

```markdown
<!-- src/components/TutorCard/README.md -->

# TutorCard Component

Componente per visualizzare le informazioni di un tutor in formato card.

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `tutor` | `Object` | ✅ | - | Dati del tutor da visualizzare |
| `onPress` | `Function` | ✅ | - | Callback eseguito al tap sulla card |
| `variant` | `'default' \| 'compact'` | ❌ | `'default'` | Variante di visualizzazione |
| `showRating` | `Boolean` | ❌ | `true` | Mostra/nasconde il rating |

## Usage

```jsx
import TutorCard from './components/TutorCard';

const tutor = {
  id: '1',
  name: 'Mario Rossi',
  subject: 'Matematica',
  rating: 4.8,
  avatar: 'https://example.com/avatar.jpg'
};

<TutorCard 
  tutor={tutor} 
  onPress={(tutor) => navigateToDetail(tutor.id)}
  variant="compact"
/>
```

## States

- **Default**: Stato normale della card
- **Pressed**: Quando l'utente preme la card
- **Loading**: Durante azioni asincrone

## Accessibility

- ✅ Screen reader support
- ✅ Keyboard navigation
- ✅ High contrast mode
- ✅ Touch target 44px minimum
```

### 📖 Documentazione API

```markdown
<!-- docs/API.md -->

# API Documentation

## Base URL
```
https://api.knowby.dev/v1
```

## Authentication

Tutti gli endpoint (eccetto login/register) richiedono un token JWT nell'header:

```
Authorization: Bearer <jwt_token>
```

## Endpoints

### Auth
- `POST /auth/login` - Login utente
- `POST /auth/register` - Registrazione nuovo utente
- `POST /auth/refresh` - Refresh token

### Tutors
- `GET /tutors` - Lista tutors con filtri
- `GET /tutors/:id` - Dettagli singolo tutor
- `POST /tutors/:id/contact` - Contatta tutor

### Users
- `GET /users/profile` - Profilo utente corrente
- `PUT /users/profile` - Aggiorna profilo
```

---

## 👥 Community e Comunicazione

### 💬 Canali di Comunicazione

- **🐛 Bug Reports**: [GitHub Issues](https://github.com/FedericoLupoli/KnowByDEV/issues)
- **💡 Feature Requests**: [GitHub Discussions](https://github.com/FedericoLupoli/KnowByDEV/discussions)
- **❓ Domande**: [GitHub Discussions Q&A](https://github.com/FedericoLupoli/KnowByDEV/discussions/categories/q-a)
- **💬 Chat**: Discord KnowBy Community (link in README)

### 🏷️ Labels e Milestone

#### Issues Labels

| Label | Descrizione | Colore |
|-------|-------------|--------|
| `🐛 bug` | Bug confermato | `#d73a4a` |
| `✨ enhancement` | Nuova funzionalità | `#a2eeef` |
| `📝 documentation` | Documentazione | `#0075ca` |
| `🚀 feature` | Feature importante | `#84b6eb` |
| `🆘 help wanted` | Aiuto richiesto | `#008672` |
| `🥇 good first issue` | Buono per principianti | `#7057ff` |
| `❓ question` | Domanda | `#d876e3` |
| `🚨 critical` | Critico, priorità alta | `#ff0000` |

#### Milestone

- **v0.3.0 - Chat System** (Q2 2025)
- **v0.4.0 - Payments Integration** (Q3 2025)
- **v1.0.0 - Public Release** (Q4 2025)

### 👨‍💻 Code Review Process

#### Per Contributori

1. **Self-review**: Controlla il tuo codice prima di aprire la PR
2. **Tests**: Assicurati che tutti i test passino
3. **Documentation**: Aggiorna documentazione se necessario
4. **Small PRs**: Mantieni le PR focalizzate e piccole

#### Per Reviewer

1. **Feedback costruttivo**: Sii specifico e propositivo
2. **Tempistiche**: Cerca di rispondere entro 48 ore
3. **Approvazione**: Approva solo se sicuro della qualità
4. **Testing**: Testa localmente se possibile

#### Checklist Code Review

```markdown
## Checklist Review

### Code Quality
- [ ] Il codice segue le convenzioni del progetto
- [ ] Non ci sono code smell o anti-pattern
- [ ] La logica è chiara e ben strutturata
- [ ] Non ci sono hardcoded values

### Functionality
- [ ] Il codice fa quello che dovrebbe fare
- [ ] Edge cases sono gestiti correttamente
- [ ] Error handling appropriato
- [ ] Performance acceptable

### Testing
- [ ] Test unitari presenti e passano
- [ ] Coverage appropriato
- [ ] Test edge cases inclusi

### Documentation
- [ ] Commenti necessari presenti
- [ ] README aggiornato se necessario
- [ ] API documentation aggiornata

### Security
- [ ] Nessuna informazione sensibile esposta
- [ ] Input validation appropriata
- [ ] Authorization checks corretti
```

### 🎉 Riconoscimenti

I contributori vengono riconosciuti in vari modi:

- **🏆 Hall of Fame**: Nel README principale
- **🎖️ Badges**: Contributor, Core Team, ecc.
- **📰 Changelog**: Menzione nelle release notes
- **🌟 GitHub Stars**: Stella speciale al profilo

#### Tipi di Contributore

- **🧑‍💻 Code Contributor**: Ha contribuito con codice
- **🐛 Bug Hunter**: Ha segnalato bug importanti
- **📝 Documentation**: Ha migliorato la documentazione
- **🎨 Design**: Ha contribuito al design UI/UX
- **🔧 Maintenance**: Aiuta con manutenzione progetto
- **👥 Community**: Attivo nella community

---

## 🚀 Onboarding per Nuovi Contributori

### 📚 Percorso di Apprendimento

#### 🟢 Livello Principiante

**Obiettivo**: Familiarizzare con il progetto

**Tasks ideali:**
- [ ] Correggere typo nella documentazione
- [ ] Aggiungere traduzione mancante
- [ ] Migliorare README
- [ ] Segnalare bug ben documentati

**Risorse:**
- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Expo Docs](https://docs.expo.dev/)
- [Git Basics](https://git-scm.com/doc)

#### 🟡 Livello Intermedio

**Obiettivo**: Contribuire con codice

**Tasks ideali:**
- [ ] Implementare componenti UI semplici
- [ ] Aggiungere test mancanti
- [ ] Correggere bug di media complessità
- [ ] Migliorare performance

**Risorse:**
- [React Native Performance](https://reactnative.dev/docs/performance)
- [Testing React Native](https://reactnative.dev/docs/testing-overview)
- [Navigation](https://reactnavigation.org/)

#### 🔴 Livello Avanzato

**Obiettivo**: Leadership tecnica

**Tasks ideali:**
- [ ] Architettura di nuove funzionalità
- [ ] Code review per altri contributori
- [ ] Ottimizzazioni performance critiche
- [ ] Integrazione sistemi complessi

**Risorse:**
- [React Native Architecture](https://reactnative.dev/docs/native-modules-intro)
- [Expo Custom Development Client](https://docs.expo.dev/development/build/)
- [EAS Build](https://docs.expo.dev/build/introduction/)

### 🎯 Prime Contribuzioni

#### Good First Issues

Cerca issue con label `🥇 good first issue`:

- Correzione bug UI minori
- Aggiunta traduzioni
- Miglioramento accessibilità
- Documentazione componenti
- Test unitari mancanti

#### Mentorship Program

Per contributori principianti:

1. **Assegnazione mentor**: Un core contributor ti guiderà
2. **Regular check-in**: Meeting settimanali opzionali
3. **Code review guidate**: Feedback dettagliati e educativi
4. **Pair programming**: Sessioni su richiesta

### 📞 Supporto

**Hai domande?** Non esitare a chiedere:

- 💬 **Discord**: Canale `#contributors`
- 📧 **Email**: [federico.lupoli@knowby.dev](mailto:federico.lupoli@knowby.dev)
- 🐙 **GitHub**: Menziona `@FedericoLupoli` nelle issue
- 💬 **Discussions**: Sezione Q&A

---

## 📄 Licenza

Contribuendo a KnowBy, accetti che i tuoi contributi siano licenziati sotto la **GNU Affero General Public License v3.0 (AGPL-3.0)**.

### 🔒 Implicazioni della Licenza

- **✅ Puoi**: usare, modificare, distribuire il software
- **⚠️ Devi**: mantenere stesso licenza, includere notice di copyright
- **🚫 Non puoi**: usare per software proprietario senza open source

### 📋 Contributor License Agreement (CLA)

Per contributi significativi, potrebbe essere richiesto di firmare un CLA per:

- Confermare di avere diritti sui contributi
- Garantire compatibilità con licenza del progetto
- Proteggere progetto da rivendicazioni future

---

## 🙏 Ringraziamenti

Grazie per voler contribuire a **KnowBy**! 

Il tuo supporto aiuta a costruire una piattaforma migliore per studenti e tutor di tutto il mondo. Ogni contributo, grande o piccolo, fa la differenza.

### 🌟 Special Thanks

Ringraziamenti speciali ai nostri contributori principali:

- **Federico Lupoli** - Project Lead & Frontend Development
- **Nicholas Bertuzzi** - Backend & Infrastructure
- **Andrea Miccoli** - UI/UX Design

E a tutti i contributori della community che rendono KnowBy sempre migliore! 🚀

---

<div align="center">

**Happy Contributing! 🎉**

<sub>Se hai suggerimenti per migliorare questa guida, [apri una issue](https://github.com/FedericoLupoli/KnowBy/issues/new)!</sub>

</div>