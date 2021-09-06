// let tbody = document.querySelector("tbody");
// let template = document.querySelector("#loanTemplate");

// let clone = template.content.cloneNode(true);
// let td = clone.querySelectorAll("td");

// td[0].textContent = "Hellow World";

// tbody.appendChild(clone);

// Total Monthly Payment = (amount loaned) * (rate/1200) / (1 - (1+rate/1200)^-number of months)
// Remaining Balance before the very first month equals the amount of the loan
// Interest Payment = Previous Remaining Balance * rate/1200
// Principal Payment = Total Monthly Payment - Interest Payment
// At the end of each month, Remaining Balance = Previous Remaining Balance - principal payment


function displayTable(vpaymentAmount, vloanAmount, vloanTerm, vloanRate){
    let payments = parseFloat(vpaymentAmount);
    let loanAmount = parseFloat(vloanAmount);
    let loanTerm = parseFloat(vloanTerm);
    let loanRate = parseFloat(vloanRate);
    
    // Variables that grab the elements to be displayed above table
    let paymentDisplay = document.getElementById("monthlyPayments");
    let totalPrincipalDisplay = document.getElementById("totalPrincipal");
    let totalInterestDisplay = document.getElementById("totalInterest");
    let totalCostDisplay = document.getElementById("totalCost");
    
    // variables needed to make clone of template
    let tbody = document.getElementById("Results");
    let template = document.getElementById("loanTemplate");

    // Totals for balance and interest.
    let balance = loanAmount;
    let totalInterest = 0;
    
    
    for (let i = 1; i <= loanTerm; i++){

        let clone = template.content.cloneNode(true);
        let td = clone.querySelectorAll("td");
        let iPay = InterestPayment(balance, loanRate);
        let principalPayment = PrincipalPayment(payments, iPay);
        balance -= principalPayment;
        totalInterest += iPay;

        td[0].textContent = i;
        td[1].textContent = `$${payments.toFixed(2)}`;
        td[2].textContent = `$${principalPayment.toFixed(2)}`;
        td[3].textContent = `$${iPay.toFixed(2)}`;
        td[4].textContent = `$${totalInterest.toFixed(2)}`;
        td[5].textContent = `$${balance.toFixed(2)}`;

        tbody.appendChild(clone);
    }

    paymentDisplay.textContent = `$${payments.toFixed(2)}`;
    totalPrincipalDisplay.textContent = `$${loanAmount}`;
    totalInterestDisplay.textContent = `$${totalInterest.toFixed(2)}`;
    totalCostDisplay.textContent = `$${(loanAmount + totalInterest).toFixed(2)}`;

}





// Control Function loanAmount loanTerm loanRate
function LoanControl(){
    let loanAmount = document.getElementById("loanAmount").value;
    let loanTerm = document.getElementById("loanTerm").value;
    let loanRate = document.getElementById("loanRate").value;
   
    let payments = MonthlyPayment(loanAmount, loanRate, loanTerm);

    displayTable(payments, loanAmount, loanTerm, loanRate);
    
}

function MonthlyPayment(loanAmount, rate, months){
    let payment = (loanAmount) * (rate/1200) / (1 - (1 + rate/1200)**(-months));
    return payment;
}

function InterestPayment(previousBalance, rate){
    let iPayment = previousBalance * rate / 1200;
    return iPayment
}

function PrincipalPayment(monthlyPayment, interestPayment){
    let principalPayment = monthlyPayment - interestPayment;
    return principalPayment;
}

