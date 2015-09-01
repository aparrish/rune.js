import Helpers from './helpers'

describe("Rune.Group", function() {

  describe("Group()", function() {

     it("should have optional x and y", function() {
      var g1 = new Rune.Group();
      expect(g1.vars.x).toEqual(0);
      expect(g1.vars.y).toEqual(0);

      var g2 = new Rune.Group(100, 101);
      expect(g2.vars.x).toEqual(100);
      expect(g2.vars.y).toEqual(101);
    });

  });

  describe("add()", function() {

    it("adds child to children and sets parent", function() {
      var g = new Rune.Group();
      var s = new Rune.Ellipse();
      expect(g.children.length).toBe(0);
      expect(s.parent).toBeUndefined();
      g.add(s);
      expect(g.children[0]).toBe(s);
      expect(s.parent).toBe(g);
    });

    it("removes child from parent", function() {
      var g1 = new Rune.Group();
      var g2 = new Rune.Group();
      var s = new Rune.Ellipse();
      g1.add(s);
      expect(s.parent).toBe(g1);
      expect(g1.children[0]).toBe(s);
      g2.add(s);
      expect(s.parent).toBe(g2);
      expect(g1.children.length).toBe(0);
      expect(g2.children[0]).toBe(s);
    });

  });

  describe("remove()", function() {

    it("removes child", function() {
      var g = new Rune.Group();
      var s = new Rune.Ellipse();
      g.add(s);
      g.remove(s);
      expect(s.parent).toBe(false);
      expect(g.children.length).toBe(0);
    })

  });

  describe("copy()", function() {

    var parent;
    var child;

    beforeEach(function() {
      parent = new Rune.Group();
      child = new Rune.Group();
      parent.add(child)
    });

    it("copies the object", function() {
      var parentEllipse = new Rune.Circle(10, 15, 300);
      var childEllipse = new Rune.Circle(10, 15, 300);
      Helpers.setMixinVars(parent);
      Helpers.setMixinVars(parentEllipse);
      Helpers.setMixinVars(child);
      Helpers.setMixinVars(childEllipse);
      parent.add(parentEllipse);
      child.add(childEllipse);

      var copy = parent.copy();
      expect(copy).toEqual(parent);
      expect(copy).not.toBe(parent);
    });

    it("adds copy to parent", function() {
      expect(parent.children.length).toEqual(1);
      child.copy();
      expect(parent.children.length).toEqual(2);
    });

    it("does not add copy to parent", function() {
      expect(parent.children.length).toEqual(1);
      child.copy(false);
      expect(parent.children.length).toEqual(1);
    });

  });

});
