const { convertToFlags } = require('./convertToFlags')

describe('Test the convertToFlag data converter', () => {
  let datetimeSpy
  const dateString = '2020-08'
  beforeEach(() => {
    datetimeSpy = jest.spyOn(Date, 'now')
    datetimeSpy.mockImplementation(() => {
      return 1597072777042
    })
  })

  test('It converts data to flags according to the definition', () => {
    const conversionMap = {
      entities: {
        person: [
          "some_benefit",
        ],
      },
      flags: {
        some_flag: {
          person: {
            "some-value": {
              my_flag: true,
            },
          },
        },
      },
    }

    const dataMap = {
      some_flag: "some-value",
    }

    const result = convertToFlags(dataMap, conversionMap)

    expect(result).toEqual(
      {
        persons: {
          person: {
            my_flag: {
              [dateString]: true,
            },
            some_benefit: {
              [dateString]: null,
            },
          },
        },
      },
    )
  })

  test('It omits fields that are not defined in the conversion map', () => {
    const conversionMap = {
      entities: {
        person: [
          "some_benefit",
        ],
      },
      flags: {
        some_flag: {
          person: {
            "some-value": {
              my_flag: true,
              my_other_flag: true,
            },
          },
        },
      },
    }

    const dataMap = {
      some_flag: "some-value",
      some_other_field: "some-other-value",
    }

    const result = convertToFlags(dataMap, conversionMap)

    expect(result).toEqual(
      {
        persons: {
          person: {
            my_flag: {
              [dateString]: true,
            },
            my_other_flag: {
              [dateString]: true,
            },
            some_benefit: {
              [dateString]: null,
            },
          },
        },
      },
    )

  })

  test("It omits an entity when there are no fields besides benefits", () =>{
    const conversionMap = {
      entities: {
        person: [
          "some_benefit",
        ],
      },
      flags: {
        some_flag: {
          person: {
            "some-value": {
              my_flag: true,
            },
          },
        },
      },
    }

    const dataMap = {
      some_other_field: "some-other-value",
    }

    const result = convertToFlags(dataMap, conversionMap)

    expect(result).toEqual(
      {
        persons: {},
      },
    )

  })

  test("It omits fields with values that are not defined in the conversion map", () => {
    const conversionMap = {
      entities: {
        person: [
          "some_benefit",
        ],
      },
      flags: {
        some_flag: {
          person: {
            "some-value": {
              my_flag: true,
            },
          },
        },
      },
    }

    const dataMap = {
      some_flag: "some-other-value",
    }

    const result = convertToFlags(dataMap, conversionMap)

    expect(result).toEqual(
      {
        persons: {},
      },
    )


  })

  test("It supports multiple entities", () => {
    const conversionMap = {
      entities: {
        person: [
          "some_benefit",
        ],
        child: [
          "some_other_benefit",
        ],
      },
      flags: {
        some_flag: {
          person: {
            "some-value": {
              my_flag: true,
            },
          },
          child: {
            "some-value": {
              my_child_flag: true,
            },
          },
        },
        some_other_field: {
          child: {
            "some-other-value": {
              my_other_child_flag: true,
            },
          },
        },
      },
    }

    const dataMap = {
      some_flag: "some-value",
      some_other_field: "some-other-value",
    }

    const result = convertToFlags(dataMap, conversionMap)

    expect(result).toEqual(
      {
        persons: {
          person: {
            my_flag: {
              [dateString]: true,
            },
            some_benefit: {
              [dateString]: null,
            },
          },
          child: {
            my_child_flag: {
              [dateString]: true,
            },
            my_other_child_flag: {
              [dateString]: true,
            },
            some_other_benefit: {
              [dateString]: null,
            },
          },
        },
      },
    )
  })

  test("Adds family object when defined", () => {
    const conversionMap = {
      entities: {
        person: [
          "some_benefit",
        ],
        child: [
          "some_other_benefit",
        ],
      },
      flags: {
        some_flag: {
          person: {
            "some-value": {
              my_flag: true,
            },
          },
          child: {
            "some-value": {
              my_child_flag: true,
            },
          },
        },
        some_other_field: {
          child: {
            "some-other-value": {
              my_other_child_flag: true,
            },
          },
        },
      },
      families: {
        "f1": {
          entities: ["person", "child"],
          data: {
            "parents": ["person"],
            "children": ["child"],
          },
        },
      },
    }

    const dataMap = {
      some_flag: "some-value",
      some_other_field: "some-other-value",
    }


    const result = convertToFlags(dataMap, conversionMap)

    expect(result).toEqual(
      {
        persons: {
          person: {
            my_flag: {
              [dateString]: true,
            },
            some_benefit: {
              [dateString]: null,
            },
          },
          child: {
            my_child_flag: {
              [dateString]: true,
            },
            my_other_child_flag: {
              [dateString]: true,
            },
            some_other_benefit: {
              [dateString]: null,
            },
          },
        },
        families: {
          "f1": {
            "parents": ["person"],
            "children": ["child"],
          },
        },
      },
    )

  })



  afterEach(() => {
    datetimeSpy.mockRestore()
  })
})
