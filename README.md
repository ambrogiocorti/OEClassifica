# 🏆 Classifica BellaFrà - OE 2026

Benvenuto nella documentazione ufficiale di **Classifica BellaFrà**, l'applicazione web progettata per la gestione in tempo reale dei punteggi delle tribù durante l'oratorio estivo.

## 📋 Indice
1. [Panoramica](#panoramica)
2. [Guida per l'Utente](#guida-per-lutente)
3. [Funzionalità Avanzate](#funzionalità-avanzate)
4. [Configurazione Tecnica](#configurazione-tecnica)
5. [Manutenzione del Database](#manutenzione-del-database)
6. [Assistente AI](#assistente-ai)

---

## 🌟 Panoramica
L'app permette agli animatori di inserire i punteggi dei giochi in modo rapido. I dati vengono salvati su un database cloud (**Supabase**) e sincronizzati istantaneamente su tutti i dispositivi connessi. Include grafici interattivi per visualizzare l'andamento delle tribù (Rossi, Verdi, Blu, Gialli).

## 📖 Guida per l'Utente

### 1. Inserimento Punti
Dalla scheda **"+" (Inserimento)**:
- **Fascia**: Seleziona tra 1-2 Elementare, 3-4-5 Elementare o Medie.
- **Tribu**: Scegli la squadra a cui assegnare i punti.
- **Sottogruppo**: La lista cambia dinamicamente (es. per la 3-4-5 EL compare l'opzione "Insieme" per le somme totali).
- **Posizione**: Selezionando il piazzamento (1°, 2°, ecc.), i punti vengono suggeriti automaticamente in base alle impostazioni.
- **Punti**: Puoi modificare il valore manualmente. Per togliere punti (penalità), inserisci il segno meno (es. `-50`).

### 2. Visualizzazione Classifica
Dalla scheda **"#" (Classifica)**:
- **Generale**: Il totale assoluto di ogni tribù.
- **Filtri**: Puoi visualizzare le classifiche specifiche per fascia d'età, per singola tribù o per sottogruppo.
- **Giornaliera**: Mostra i punti accumulati nella data selezionata.

### 3. Storico e Correzioni
Dalla scheda **"X" (Dettagli)**:
- Visualizza la lista cronologica di tutti i punti inseriti.
- Per correggere un errore, clicca sulla **"X" rossa** accanto all'inserimento per eliminarlo, quindi inseriscilo di nuovo correttamente.

## ⚙️ Funzionalità Avanzate

### Impostazioni Punteggi Predefiniti
Cliccando sull'icona dell'ingranaggio in alto a destra, puoi personalizzare i punti assegnati per ogni posizione nei "Gioconi" e nei "Giochi Piccoli". Questi valori vengono salvati localmente sul tuo browser.

### Sincronizzazione Real-time
L'app usa i canali di Supabase: ogni volta che un animatore salva un punto, la classifica di tutti gli altri utenti si aggiorna automaticamente senza dover ricaricare la pagina.

## 🛠️ Configurazione Tecnica

- **Frontend**: HTML5, Tailwind CSS (styling), Chart.js (grafici).
- **Backend**: Supabase (PostgreSQL + Realtime).

### Struttura Tabella `punteggi`
La tabella nel database deve avere le seguenti colonne:
- `id`: int8 (Primary Key, Identity)
- `created_at`: timestamptz (Default: now())
- `tribu`: text
- `fascia`: text
- `sottogruppo`: text
- `tipo_gioco`: text
- `punti`: int8

## 🗄️ Manutenzione del Database

Per garantire il corretto funzionamento delle ultime modifiche (punti negativi e gruppi aggregati), è necessario eseguire i seguenti comandi SQL nel pannello di controllo di Supabase:

### 1. Abilitare punti negativi (Penalità)
Se l'app dà errore inserendo numeri minori di zero, esegui:
```sql
ALTER TABLE punteggi 
DROP CONSTRAINT IF EXISTS punteggi_punti_check;
```

### 2. Aggiornare i Sottogruppi (3-4-5 Insieme)
Per permettere il salvataggio del gruppo "Insieme (3-4-5)":
```sql
ALTER TABLE punteggi 
DROP CONSTRAINT IF EXISTS punteggi_sottogruppo_check;

ALTER TABLE punteggi 
ADD CONSTRAINT punteggi_sottogruppo_check 
CHECK (sottogruppo IN (
  'Maschi', 
  'Femmine', 
  'Unico', 
  'Insieme (3-4-5)', 
  '3a Elementare', 
  '4a Elementare', 
  '5a Elementare'
));
```