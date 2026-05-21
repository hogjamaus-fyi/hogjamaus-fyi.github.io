#!/usr/bin/env python3

"""Print a set of clever dad jokes."""


def tell_dad_jokes() -> None:
    jokes = [
        (
            "Why did the chicken look for the fork in the road?",
            "Cause he was hoping for a good tune.",
        ),
        (
            "Why did the scarecrow get promoted?",
            "Because he was outstanding in his field.",
        ),
        (
            "Why do dads bring an extra pair of socks to golf?",
            "In case they get a hole in one.",
        ),
        (
            "Why did the computer go to therapy?",
            "It had too many unresolved issues.",
        ),
        (
            "Why did the calendar break up with the clock?",
            "It needed more space and less pressure.",
        ),
    ]

    print("Top Father AI: Clever Dad Jokes")
    print("-" * 32)
    for setup, punchline in jokes:
        print(f"Q: {setup}")
        print(f"A: {punchline}\n")


if __name__ == "__main__":
    tell_dad_jokes()
