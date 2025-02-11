''' Get the name(s) connected with the second-lowest value 
https://www.hackerrank.com/challenges/nested-list/problem
'''
if __name__ == '__main__':
    name_grades = []
    for _ in range(int(input())):
        name = input()
        score = float(input())
        name_grades.append([name, score])

    name_grades.sort(key=lambda x: x[-1])
    just_grades = [x for _, x in name_grades]
    unique_grades = sorted(set(just_grades))
    second_lowest_grade = unique_grades[1]
    second_lowest_count = just_grades.count(second_lowest_grade)

    print("\n".join(sorted(name for name, grade in name_grades if grade == second_lowest_grade)))
