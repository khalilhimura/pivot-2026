import importlib.util
from pathlib import Path
import unittest

spec = importlib.util.spec_from_file_location('course_media_verifier', Path(__file__).resolve().parents[1] / 'production/verify_course_media.py')
media = importlib.util.module_from_spec(spec)
spec.loader.exec_module(media)


class MediaBudgetTest(unittest.TestCase):
    source = [{'instruction_minutes': n} for n in [2, 3, 4, 5, 3, 2, 1]]

    def test_exact_twenty_minute_explanation_budget_is_allowed(self):
        lessons = [{'duration_seconds': n} for n in [120, 180, 240, 300, 180, 120, 60]]
        self.assertEqual(media.verify_duration_budget(lessons, self.source), 1200)

    def test_individually_tolerated_overruns_cannot_exceed_total_budget(self):
        lessons = [{'duration_seconds': n} for n in [121, 181, 241, 301, 181, 121, 61]]
        with self.assertRaisesRegex(AssertionError, 'explanation budget'):
            media.verify_duration_budget(lessons, self.source)


if __name__ == '__main__':
    unittest.main()
