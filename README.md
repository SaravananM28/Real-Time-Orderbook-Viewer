# Real-Time Orderbook Viewer with Simulation

This project is a simple web-based application that displays a real-time orderbook for the BTC/USDT pair using OKX exchange data and allows users to simulate placing buy/sell orders.

## 🌐 Live Features

- **Live Orderbook** updates using WebSocket from OKX exchange.
- **Order Simulation** for both Market and Limit order types.
- **Slippage and Market Impact Calculation** based on simulated orders.
- **Visual Highlighting** for simulated orders within the orderbook.

## 📁 Project Structure

project/
├── index.html # Main HTML file
├── Assets/
│ ├── CSS/
│ │ └── style.css # Stylesheet for layout and design
│ └── Javascript/
│ └── script.js # WebSocket and simulation logic


## 🛠️ Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- WebSocket API (OKX)

## ▶️ How to Run

1. Download or clone the project.
2. Open `index.html` in any modern web browser.
3. Watch the live orderbook update and use the simulation form to place test orders.

## ⚙️ Simulation Options

- **Order Type**: Market or Limit
- **Side**: Buy or Sell
- **Price & Quantity**: Define for Limit orders
- **Delay**: Simulate order after a custom delay (0–30 seconds)

## 📊 Output Metrics

After simulation, you’ll see:
- **Estimated Fill %**
- **Market Impact**
- **Slippage**

## 📌 Notes

- This project does not place real orders; it's for educational/demo purposes only.
- All market data comes from OKX’s free public WebSocket feed.

## 📝 License

Free to use for learning and demo purposes. Attribution appreciated.
