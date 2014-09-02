public class Result{
	public static void run(Integer numOfTests, Integer testsPassed, Integer score) {
		String resultString = "<<RESULT>>" + numOfTests.toString() + ":" + testsPassed.toString() + ":" + score.toString() + "<<RESULT>>";
		System.out.println(resultString);
	}
}