const bidsEl = document.getElementById('bids');
    const asksEl = document.getElementById('asks');
    let bids = [], asks = [];
    let ws;

    function connectOrderbook() {
      ws = new WebSocket('wss://ws.okx.com:8443/ws/v5/public');

      ws.onopen = () => {
        ws.send(JSON.stringify({
          op: 'subscribe',
          args: [{
            channel: 'books5',
            instId: 'BTC-USDT'
          }]
        }));
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.arg && data.data) {
          const orderbook = data.data[0];
          bids = orderbook.bids.slice(0, 15);
          asks = orderbook.asks.slice(0, 15);
          updateOrderbook();
        }
      };

      ws.onerror = () => {
        console.error('WebSocket error. Reconnecting...');
        setTimeout(connectOrderbook, 3000);
      };
    }

    function updateOrderbook(simulated = null) {
      bidsEl.innerHTML = '';
      asksEl.innerHTML = '';
      asks.slice().reverse().forEach(([price, qty]) => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${price}</td><td>${qty}</td>`;
        if (simulated && simulated.side === 'sell' && parseFloat(simulated.price) === parseFloat(price)) {
          row.classList.add('simulated');
        }
        asksEl.appendChild(row);
      });

      bids.forEach(([price, qty]) => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${price}</td><td>${qty}</td>`;
        if (simulated && simulated.side === 'buy' && parseFloat(simulated.price) === parseFloat(price)) {
          row.classList.add('simulated');
        }
        bidsEl.appendChild(row);
      });
    }

    function simulateOrder() {
      const type = document.getElementById('orderType').value;
      const side = document.getElementById('side').value;
      const price = parseFloat(document.getElementById('price').value);
      const qty = parseFloat(document.getElementById('quantity').value);
      const delay = parseInt(document.getElementById('delay').value);
      const metrics = document.getElementById('metrics');

      if (type === 'limit' && isNaN(price)) {
        alert('Limit order requires a price');
        return;
      }
      if (isNaN(qty) || qty <= 0) {
        alert('Quantity must be a positive number');
        return;
      }

      const simulate = () => {
        updateOrderbook({ side, price });
        let slippage = 0;
        let filled = 0;
        let remaining = qty;
        const book = side === 'buy' ? asks : bids;

        for (const [p, q] of book) {
          const bookPrice = parseFloat(p);
          const bookQty = parseFloat(q);
          if ((side === 'buy' && bookPrice <= price) || (side === 'sell' && bookPrice >= price)) {
            const fillQty = Math.min(bookQty, remaining);
            remaining -= fillQty;
            slippage += Math.abs(bookPrice - price) * fillQty;
            filled += fillQty;
            if (remaining <= 0) break;
          }
        }

        const fillPercent = (filled / qty) * 100;
        const avgImpact = filled ? (slippage / filled).toFixed(2) : 0;
        metrics.innerHTML = `
          <strong>Estimated Fill:</strong> ${fillPercent.toFixed(1)}%<br>
          <strong>Market Impact:</strong> ${avgImpact} USDT<br>
          <strong>Slippage:</strong> ${slippage.toFixed(2)} USDT
        `;
      };

      if (delay > 0) {
        metrics.innerText = `Simulating after ${delay / 1000}s delay...`;
        console.log(metrics.innerText)
        setTimeout(simulate, delay);
      } else {
        simulate();
      }
    }

    connectOrderbook();
  