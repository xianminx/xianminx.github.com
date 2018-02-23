import random

N = 10 

def minimum(N=10):
    minimum = 1.0
    for i in xrange(N):
        minimum = min(minimum, random.random())
    return minimum


def expect_min(N=10, rounds=100000):
    sum = 0.0
    for i in xrange(rounds):
        sum += minimum(N)
    return sum/rounds

N = 100
expect_mins = {}
for i in range(1, N+1):
    expect_mins[i] = expect_min(i) -  1.0/(i+1)
    print 'i: ', i, expect_mins[i]

print expect_mins