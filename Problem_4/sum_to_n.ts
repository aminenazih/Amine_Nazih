function sum_to_n_a(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}




function sum_to_n_b(n: number): number {
    return (n * (n + 1)) / 2;
}




function sum_to_n_c(n: number): number {
    if (n <= 1) {
        return n;
    }
    return n + sum_to_n_c(n - 1);
}

function test_sum_to_n_c() {
    console.log(sum_to_n_c(1) === 1 ? 'Pass' : 'Fail');     // 1
    console.log(sum_to_n_c(5) === 15 ? 'Pass' : 'Fail');    // 1 + 2 + 3 + 4 + 5 = 15
    console.log(sum_to_n_c(10) === 55 ? 'Pass' : 'Fail');   // 1 + 2 + ... + 10 = 55
    console.log(sum_to_n_c(0) === 0 ? 'Pass' : 'Fail');     // Edge case: n = 0
    console.log(sum_to_n_c(100) === 5050 ? 'Pass' : 'Fail');// 1 + 2 + ... + 100 = 5050
}

test_sum_to_n_c();
 
