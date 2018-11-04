import java.util.Arrays;
import java.util.Random;
import java.util.function.Consumer;

class Sort {

  /**
   * swap the elements at index i and j in the array a
   */
  public void swap(int[] a, int i, int j) {
    if (i != j) {
      int t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
  }

  /**
   * Select sort each time find the min of the remaining elements in the array and
   * append it to the pre-sorted array.
   */
  public void selectSort(int[] a) {
    for (int i = 0; i < a.length; i++) {
      // int min = min(a, i, a.length-1)
      int min = i;
      for (int j = i + 1; j < a.length; j++) {
        if (a[min] > a[j]) {
          min = j;
        }
      }
      if (min != i) {
        swap(a, i, min);
      }
    }
  }

  /**
   * Bubble the largest element to the tail each iteration by comparing and
   * swapping the adjcent two elements.
   */
  public void bubbleSort(int[] a) {
    for (int i = 0; i < a.length; i++) {
      // each time, bubble the largest element to the tail.
      for (int j = 0; j + i < a.length - 1; j++) {
        if (a[j] > a[j + 1]) {
          swap(a, j, j + 1);
        }
      }
    }
  }

  public void insertSort(int[] a) {
    for (int i = 1; i < a.length; i++) {
      // each time insert the current element to the pre-sorted array by swaping
      // adjcent elements.
      for (int j = i; j > 0; j--) {
        if (a[j - 1] > a[j]) {
          swap(a, j, j - 1);
        }
      }
    }
  }

  public void quickSort(int[] a) {
    quickSortInternal(a, 0, a.length - 1);
  }

  private void quickSortInternal(int[] a, int p, int r) {
    if (p < r) {
      int q = partition(a, p, r);
      quickSortInternal(a, p, q - 1);
      quickSortInternal(a, q + 1, r);
    }
  }

  /**
   * Helper function for quick sort, which finds the location of the pivot value
   * and partition the array into two sub arrays.
   */
  private int partition(int[] a, int p, int r) {
    int x = a[r];
    int i = p - 1;
    int j = p;
    while (j <= r - 1) {
      if (a[j] < x) {
        i++;
        swap(a, i, j);
      }
      j++;
    }
    swap(a, i + 1, r);
    return i + 1;
  }

  /**
   * Generate a random int array.
   * 
   * @param n    length of the array
   * @param seed the seed, for testing purpose, set the same seed.
   * @return
   */
  private int[] randomArray(int n, long seed) {
    int[] out = new int[n];
    Random random = new Random(seed);
    for (int i = 0; i < n; i++) {
      out[i] = random.nextInt(100);
    }
    return out;
  }

  public void test() {
    int SIZE = 10;
    long SEED = new Random().nextLong();
    int[] toSort = randomArray(SIZE, SEED);
    int[] a;

    System.out.println("To sort array: ");
    System.out.println(Arrays.toString(toSort));
    for (int i = 0; i < 80; i++)
      System.out.print("-");
    System.out.println("");

    System.out.println("Sort array using : " + "selectSort");
    a = toSort.clone();
    selectSort(a);
    System.out.println(Arrays.toString(a));
    System.out.println("Sort array using : " + "bubbleSort");
    a = toSort.clone();
    bubbleSort(a);
    System.out.println(Arrays.toString(a));
    System.out.println("Sort array using : " + "insertSort");
    a = toSort.clone();
    insertSort(a);
    System.out.println(Arrays.toString(a));
    System.out.println("Sort array using : " + "quickSort");
    a = toSort.clone();
    quickSort(a);
    System.out.println(Arrays.toString(a));

  }

  public static void main(String[] args) {
    Sort sort = new Sort();
    sort.test();
  }

}