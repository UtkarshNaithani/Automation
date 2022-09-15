module.exports= {
answer : [ 
    
`
#include <cmath>
#include <cstdio>
#include <vector>
#include <iostream>
#include <algorithm>
using namespace std;


int main() {
    /* Enter your code here. Read input from STDIN. Print output to STDOUT */   
    int numLines;
    int currNumber, total = 0;
    
    cin >> numLines;
    
    for (int i=0; i<numLines;i++) {
        cin >> currNumber;
        total += currNumber;
    }
    
    cout << total;
    
    return 0;
}
`
]
}