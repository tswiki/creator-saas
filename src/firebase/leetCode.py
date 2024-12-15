

from typing import List


class Solution:

    def containsDuplicate(self, nums: List[int]) -> bool:

        for x in nums:

            count = 0

            print("\nCurrent x in nums: ", x, "\n")

            for i in nums:

                print("Current i in nums: ", i)


                if (x==i):

                    if (count==0):
                        count=count+1
                        print(f"Instance of {x}: {nums.index(i)}")


                    if (count==1):
                        print(f"Duplicate instance of {x}: {nums.index(i)}")
                        return True
                    
                print("Count value: ", count)
                    
            print("No duplicates")

            return False


solution = Solution()

print(solution.containsDuplicate([1,2,3,4]))