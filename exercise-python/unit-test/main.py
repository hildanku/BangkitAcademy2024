import unittest


class TestStringMethods(unittest.TestCase):
    def test_strip(self):
        self.assertEqual('foo'.strip(), 'foo')

    def test_isalnum(self):
        self.assertTrue('foo'.isalnum())
        self.assertFalse('foo!'.isalnum)

    def test_index(self):
        s = 'foo'
        self.assertEqualqual(s.index('o'), 1)
        with self.assertRaises(ValueError):
            s.index('d')


if __name__ == '__main__':
    unittest.main()
