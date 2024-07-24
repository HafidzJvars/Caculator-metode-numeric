public class NumericIntegrator {
    public static double integrate(Function f, double a, double b, int n) {
        double h = (b - a) / n;
        double sum = 0;

        for (int i = 0; i < n; i++) {
            double x = a + i * h;
            sum += f.apply(x);
        }

        return h * sum;
    }

    public static double rombergIntegrate(Function f, double a, double b, int n) {
        double[] R = new double[n + 1];

        for (int i = 0; i <= n; i++) {
            R[i] = integrate(f, a, b, (int) Math.pow(2, i));
        }

        for (int i = 1; i <= n; i++) {
            for (int j = 0; j < n - i + 1; j++) {
                R[j] = R[j] + (R[j] - R[j + 1]) / (Math.pow(2, i) - 1);
            }
        }

        return R[0];
    }

    public interface Function {
        double apply(double x);
    }

    public static void main(String[] args) {
        Function f = x -> x * x; // contoh fungsi x^2
        double a = 0;
        double b = 2;
        int n = 5;

        double result = rombergIntegrate(f, a, b, n);
        System.out.println("Hasil integrasi numerik: " + result);
    }
}