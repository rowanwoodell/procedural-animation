
function mod(n, m) {
  return ((n % m) + m) % m;
}

function constrainSpine(front, back, sep) {
  frontToBack = p5.Vector.sub(back, front)
  frontToBack.setMag(sep)
  return p5.Vector.add(front, frontToBack)
}

// function constrainAngle(me, behind1, behind2, limit, sep) {
//   front = p5.Vector.sub(me, behind1)
//   back = p5.Vector.sub(behind1, behind2)
//   print(front.angleBetween(back))
//   if (Math.abs(back.angleBetween(front)) < limit) {
//     newAngle = back.heading() - limit
//     newMe = p5.Vector.fromAngle(newAngle).setMag(sep)
//     return(behind1.add(newMe))
//   } else {
//     return(me)
//   }
// }

function pointOnSegment(segment, size, angle, angleDiff) {
  v = p5.Vector.fromAngle(angle + angleDiff)
  v.mult(size / 2)
  v.add(segment)
  return v
}

function setup() {
  createCanvas(windowWidth, windowHeight)

  spineLength = 5
  spineSeparation = 80
  angleLimit = 3 * PI / 4

  spineSegments = []
  spineSegmentSizes = []
  spineSegmentAngles = []
  
  for (i = 0; i < spineLength; i++) {
    seg_x = (width - (spineLength - 1) * spineSeparation) / 2 + (i * spineSeparation)
    spineSegments.push(createVector(seg_x, height/2))
    // spineSegmentSizes.push(floor(random(60, 80)))
    spineSegmentSizes.push(64)
  }
}

function draw() {
  background(240);
  
  curvePoints = []

  headToMouseVector = p5.Vector.sub(createVector(mouseX, mouseY), spineSegments[0])

  if (mouseIsPressed) {
    spineSegments[0].add(headToMouseVector.mult(0.2))
  }

  // DISTANCE CONSTRAINT
  for (i = 0; i < spineLength - 1; i++){
    spineSegments[i + 1] = constrainSpine(spineSegments[i], spineSegments[i + 1], spineSeparation)
  }

  // ANGLE CONSTRAINT (WIP)
  // for (i = 0; i < spineLength - 2; i++) {
  //   // front = p5.Vector.sub(spineSegments[i    ], spineSegments[i + 1])
  //   // back  = p5.Vector.sub(spineSegments[i + 1], spineSegments[i + 2])
  //   constrain(p5.Vector.sub(spineSegments[i    ], spineSegments[i + 1])
  //             .angleBetween(p5.Vector.sub(spineSegments[i + 1], spineSegments[i + 2])),
  //             angleLimit, PI)
  // }
  
  // stroke(0)
  // strokeWeight(7)
  
  // for (i = 0; i < spineLength; i++) {
  //   circle(spineSegments[i].x, spineSegments[i].y, spineSegmentSizes[i])
  // }

  headToMouseVector = p5.Vector.sub(createVector(mouseX, mouseY), spineSegments[0])
  spineSegmentAngles[0] = headToMouseVector.heading()

  for (i = 0; i < spineLength - 1; i++) {
    vectorBetween = p5.Vector.sub(spineSegments[i], spineSegments[i + 1])
    spineSegmentAngles[i + 1] = vectorBetween.heading()
    // line(spineSegments[i].x, spineSegments[i].y, spineSegments[i + 1].x, spineSegments[i + 1].y)
  }

  stroke(200)
  strokeWeight(7)

  beginShape()

  // RIGHT SIDE
  for (i = 0; i < spineLength; i++) {
    p = pointOnSegment(spineSegments[i], spineSegmentSizes[i], spineSegmentAngles[i], -PI / 2)
    curveVertex(p.x, p.y)
  }

  // TAIL DETAIL
  p = pointOnSegment(spineSegments[spineLength - 1], spineSegmentSizes[spineLength - 1] * 3, spineSegmentAngles[spineLength - 1],  PI)
  curveVertex(p.x, p.y)

  // LEFT SIDE
  for (i = spineLength - 1; i >= 0; i--) {
    p = pointOnSegment(spineSegments[i], spineSegmentSizes[i], spineSegmentAngles[i],  PI / 2)
    curveVertex(p.x, p.y)
  }

  // HEAD DETAIL
  p = pointOnSegment(spineSegments[0], spineSegmentSizes[0] * 1.7, spineSegmentAngles[0],  PI / 4)
  curveVertex(p.x, p.y)
  p = pointOnSegment(spineSegments[0], spineSegmentSizes[0] * 2.5, spineSegmentAngles[0],  PI / 10)
  curveVertex(p.x, p.y)
  p = pointOnSegment(spineSegments[0], spineSegmentSizes[0] * 2.5, spineSegmentAngles[0], -PI / 10)
  curveVertex(p.x, p.y)
  p = pointOnSegment(spineSegments[0], spineSegmentSizes[0] * 1.7, spineSegmentAngles[0], -PI / 4)
  curveVertex(p.x, p.y)
  
  endShape(CLOSE)

}

